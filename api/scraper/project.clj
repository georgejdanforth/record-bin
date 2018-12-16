(defproject scraper "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/data.json "0.2.6"]
                 [uswitch/lambada "0.1.2"]
                 [clj-http "3.9.1"]
                 [hickory "0.7.1"]]
  :profiles {:uberjar {:aot :all}}
  :uberjar-name "record-bin-scraper.jar")
