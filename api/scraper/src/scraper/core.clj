(ns scraper.core
  (:require [uswitch.lambada.core :refer [deflambdafn]]
            [clojure.data.json :as json]
            [clojure.java.io :as io]
            [clj-http.client :as http]))

(def media-type-regexes
  [#"(soundcloud)\.com\/[^/]+?(?:\/sets)?\/[^/]+$"
   #"open\.(spotify)\.com\/(?:track|album|user\/[^/]+\/playlist)\/[^/]+$"
   #".+?\.(bandcamp)\.com\/(?:album|track)\/[^/]+$"
   #"(youtube)\.com\/(?:watch)\?v=.+?$"])

(defn url-decode [encoded-url]
  (if encoded-url (java.net.URLDecoder/decode encoded-url)))

(defn url-encode [decoded-url]
  (if decoded-url (java.net.URLEncoder/encode decoded-url)))

(defn construct-request-url [media-type media-url]
  (case media-type
    :bandcamp media-url
    :soundcloud "https://soundcloud.com/oembed"
    :spotify
    (str
      "https://embed.spotify.com/oembed?url="
      (url-encode media-url))
    :youtube
    (str
      "https://www.youtube.com/oembed?url="
      (url-encode media-url)
      "&format=json")))

(defn get-media-url [event]
  (url-decode (get-in event ["queryStringParameters" "url"])))

(defn get-media-type [media-url]
  (some
    #(if-let [[full domain & others]  %] (keyword domain))
    (map #(re-find % media-url) media-type-regexes)))

(defn scrape [media-type media-url]
  (let [request-url (construct-request-url media-type media-url)] request-url))

(defn handle [event]
  (println (get-media-url event))
  (println (get-media-type (get-media-url event)))
  (if-let [media-url (get-media-url event)]
    (if-let [media-type (get-media-type media-url)]
      {:url (scrape media-type media-url)}
      :bad-url!)
    :no-url!))

(deflambdafn scraper.core.RecordBinScraper 
  [in out context]
  (let [event (json/read (io/reader in))
        result (handle event)]
    (with-open [w (io/writer out)]
      (json/write result w))))
