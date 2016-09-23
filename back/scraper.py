from com.scrape import get_tree, tree_title
import gevent

from com.que import QueItem
from com.gevent_que import GeventQue
from front.home import *
import settings
from urlparse import urljoin
from com.string_utils import get_domain


class SiteScraper(object):
    def __init__(self):
        self.scrape_que = GeventQue(self.process_scrape_que)

    def process_scrape_que(self, que):
        while que.size:
            item = que.pop()
            page = Page.get(key=item.page_key)
            if not page:
                logging.error("Page not found: %s", item.page_key)
                continue
            tree, final_url = get_tree(page.url, is_prod=settings.IS_LIKE_PROD)
            urls = []
            assets = []
            title = None
            site = page.site
            if tree is not None:
                title = tree_title(tree)
                tree_urls = tree.xpath("//a/@href")
                if tree_urls:
                    for url in tree_urls:
                        url = urljoin(final_url, url)
                        self.scrape(url, page.site_key)
                        urls.append(url)

                asset_map = (site.data and site.data.copy()) or {}
                for xpath in ["//javascript/@src", "//img/@src"]:
                    tree_urls = tree.xpath(xpath)
                    if tree_urls:
                        for url in tree_urls:
                            url = urljoin(final_url, url)
                            assets.append(url)
                            count = asset_map.get(url) or 0
                            asset_map[url] = count + 1
                site.data = asset_map

            page.data = dict(urls=urls,
                             title=title,
                             assets=assets)
            db.commit()

    def scrape(self, url, site_key):
        hash = url.find('#')
        if hash != -1:
            url = url[:hash]
        site = Site.get(key=site_key)
        if not site:
            logging.error("Site not found: %s", site_key)
            return
        if get_domain(url) != site.domain:
            return
        if not Page.get(url=url, site_key=site_key):
            logging.info("New URL: %s", url)
            page = Page(url=url, site_key=site_key)
            site.increment('num_pages')
            site.progress = "%d pages found" % site.num_pages
            if datetime.utcnow() - site.last_relay_at >= timedelta(seconds=3):
                site.last_relay_at = datetime.utcnow()
                relay.send_room('everybody', site.to_dict(), event='site')
            db.commit()
            gevent.sleep(0.10)
            self.scrape_que.append(QueItem(page_key=page.key))
            return url

scraper = SiteScraper()
