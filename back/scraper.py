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
                logging.error("PAGE NOT FOUND: %s", item.page_key)
                continue
            tree, final_url = get_tree(page.url, is_prod=settings.IS_LIKE_PROD)
            urls = []
            title = None
            if tree is not None:
                title = tree_title(tree)
                tree_urls = tree.xpath("//a/@href")
                if tree_urls:
                    for url in tree_urls:
                        url = urljoin(final_url, url)
                        urls.append(url)
                        self.scrape(url, page.site_key)
            page.data = dict(urls=urls,
                             title=title)
            db.commit()

    def scrape(self, url, site_key):
        hash = url.find('#')
        if hash != -1:
            url = url[:hash]
        site = Site.get(key=site_key)
        if not site:
            logging.error("SITE NOT FOUND: %s", site_key)
            return
        if get_domain(url) != site.domain:
            return
        if not Page.get(url=url, site_key=site_key):
            print "NEW URL:", url
            page = Page(url=url, site_key=site_key)
            db.commit()
            self.scrape_que.append(QueItem(page_key=page.key))


scraper = SiteScraper()
