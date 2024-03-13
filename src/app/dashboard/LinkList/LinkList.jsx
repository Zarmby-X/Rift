import "./LinkList.css";
import LinkCard from "../../components/LinkCard/LinkCard";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import SearchLinkInput from "../../components/SearchLinkInput/SearchLinkInput";
import { Stick_No_Bills } from "next/font/google";

const stick_No_Bills = Stick_No_Bills({
  weight: ["400"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
});

export default function LinkList(props) {
  const [urls, setUrls] = useState(null);
  const [filteredUrls, setFilteredUrls] = useState([]);
  const [notMatchUrls, setNotMatchUrls] = useState(false);
  const [loading, setLoading] = useState(true);

  const filterUrl = (filterText) => {
    if (urls) {
      setLoading(true);
      const filteredUrlsByAlias = urls.urls.filter((url) =>
        url.alias.includes(filterText)
      );
      const filteredUrlsByOriginalUrl = urls.urls.filter((url) =>
        url.originalUrl.includes(filterText)
      );
      const filteredUrlsByRiftUrl = urls.urls.filter((url) =>
        url.riftUrl.includes(filterText)
      );
      const finalMatchedUrls = new Set([
        ...filteredUrlsByAlias,
        ...filteredUrlsByOriginalUrl,
        ...filteredUrlsByRiftUrl,
      ]);
      setFilteredUrls([...finalMatchedUrls]);
      if ([...finalMatchedUrls].length == 0) {
        setNotMatchUrls(true);
      } else {
        setNotMatchUrls(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("https://riftn.vercel.app/api/urls", {
      headers: {
        jwt: props.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUrls(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div id="urlsLoadingPositionWrap">
        <Loading></Loading>
      </div>
    );
  }

  return (
    <>
      <SearchLinkInput filterUrl={filterUrl}></SearchLinkInput>
      {!filteredUrls.length > 0 && !notMatchUrls && (
        <div id="linksContainers">
          {console.log(urls)}
          {urls.urls.map((url) => {
            return (
              <LinkCard
                key={"url" + url.id}
                id={url.id}
                alias={url.alias}
                originalUrl={url.originalUrl}
                riftUrl={url.riftUrl}
                toogleAlert={props.toogleAlert}
                toogleModal={props.toogleModal}
                toogleDeleteAlert={props.toogleDeleteAlert}
              ></LinkCard>
            );
          })}
        </div>
      )}
      {filteredUrls.length > 0 && (
        <div id="linksContainers">
          {filteredUrls.map((url) => {
            return (
              <LinkCard
                key={"url" + url.id}
                id={url.id}
                alias={url.alias}
                originalUrl={url.originalUrl}
                riftUrl={url.riftUrl}
                toogleAlert={props.toogleAlert}
                toogleModal={props.toogleModal}
                toogleDeleteAlert={props.toogleDeleteAlert}
              ></LinkCard>
            );
          })}
        </div>
      )}
      {notMatchUrls && (
        <div id="notMatchedContainer">
          <p className={stick_No_Bills.className}>Not records matches</p>
        </div>
      )}
    </>
  );
}
