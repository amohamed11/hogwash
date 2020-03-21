import scrapy
import json

BASE_URL = 'https://www.wordnik.com/'
DICT_URL = 'https://www.merriam-webster.com/dictionary/'

WORDS = []
with open('words.json') as fin:
    word_dict_list = json.load(fin)
    for word_dict in word_dict_list:
        word = list(word_dict.keys())[0]
        WORDS.append(word)

# class BalderdashSpider(scrapy.Spider):
#     name = 'BalderdashSpider'
#     start_urls = [BASE_URL + 'lists/balderdash-game-words']

#     def parse(self, response):
#         for word in response.css('#sortable_wordlist>li'):
#             word_text = word.css('a ::text').get()
#             if word_text != None:
#                 yield { word_text: '' }

        # for word in words.keys():
        #     def_page_url =  DICT_URL + word
        #     definition_text = scrapy.Request(def_page_url, callback=self.parse_definition)

        #     yield {word: definition_text}


class DefinitionSpider(scrapy.Spider):
    name = "DefinitionSpider"
    start_urls = []
    for word in WORDS:
        start_urls.append(DICT_URL + word)

    def parse(self, response):
        # definition = response.css('.guts>ul:nth-child(2)>li').extract()
        word = str(response.url).rsplit('/', 1)[-1]
        definition = response.css(".dtText").get()

        yield { word: definition }
