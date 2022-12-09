/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
//Fun fact I was gonna create 2 components but, the next and previous button was tricky as expected
//so because of that, I gave up on making a second component as the image visualizer,
//so, I never do it all in one component but React.js is not Svelte and I wasted time
import { useEffect, useState } from "react";
import { useWindowSize, appendStyles } from "../../hooks/toolbox";
import styles from "./FilmStrip.module.css";
import prev from "../../../public/icons/previous.png";
import next from "../../../public/icons/next.png";
import { loadUpImage, loadupThumbnail } from "../../services/getImages";

type FilmStrip = {
  title: string;
  cost: string;
  id: string;
  description: string;
  thumbnail: string;
  image: string;
  base64?: string;
};

interface FilmStripProps {
  isDisabled: boolean;
  filmStrip: FilmStrip[];
  selectThumbnail: (id: string) => string;
  selectedThumbnailId: string;
}

export const FilmStrip = ({
  isDisabled,
  filmStrip,
  selectThumbnail,
  selectedThumbnailId,
}: FilmStripProps) => {
  const { width } = useWindowSize();

  //I was expecting a mobile version of the Crunch test as well
  //but since I didn't find it, I will leave it here so you guys can see, idk
  const isMobile = width !== undefined && width <= 800;

  const [thumbLoaded, setThumbLoaded] = useState([]);

  const [firstLoad, setFirstLoad] = useState(true);
  const [currentThumbnail, setCurrentThumbnail] = useState(filmStrip[0]);
  const [selectedId, setSelectedId] = useState(selectedThumbnailId);
  const [isOnFirst, setIsOnFirst] = useState(true);
  const [isOnLast, setIsOnLast] = useState(false);
  const [currentTemplates, setCurrentTemplates] = useState(
    filmStrip.slice(0, 4)
  );
  const [largeImageUrl, setLargeImageUrl] = useState("");

  function thumbnailClick(option: FilmStrip) {
    selectThumbnail(option.id);
    setSelectedId(option.id);

    for (let i = 0; i < filmStrip.length; i++) {
      if (filmStrip[i].id === option.id) {
        setCurrentThumbnail(filmStrip[i]);
      }
    }
    setCurrentTemplates(currentTemplates);
  }

  async function loadImage() {
    const base64 = await loadUpImage(currentThumbnail.image);
    setLargeImageUrl(base64.image);
  }

  function disableButtons(index: number) {
    if (index === 0) {
      setIsOnFirst(true);
    } else {
      setIsOnFirst(false);
    }
    if (index + 4 >= filmStrip.length) {
      setIsOnLast(true);
    } else {
      setIsOnLast(false);
    }
  }

  async function loadThumbnail() {
    const array = currentTemplates;
    for (let i = 0; i < array.length; i++) {
      const base64 = await loadupThumbnail(array[i].thumbnail);
      array[i].base64 = base64.image;
    }
    setCurrentTemplates(array);
  }

  //total pain in the ass foward
  function loadNextTemplates() {
    if (!isOnLast) {
      let index = 0;
      for (let i = 0; i < filmStrip.length; i++) {
        if (
          filmStrip[i].id === currentTemplates[currentTemplates.length - 1].id
        ) {
          index = i + 1;
          break;
        }
      }

      if (index + 4 > filmStrip.length - 1) {
        index = filmStrip.length - 4;
      }

      // if (index + 4 > filmStrip.length - 1) {
      //   setIsOnLast(true);
      //   setIsOnFirst(false);
      // } else {
      //   setIsOnLast(false);
      //   setIsOnFirst(false);
      // }

      disableButtons(index);

      setCurrentTemplates(filmStrip.slice(index, index + 4));
    }
  }

  //total pain in the ass backwards
  function loadPrevTemplates() {
    if (!isOnFirst) {
      let index = 0;
      for (let i = 0; i < filmStrip.length; i++) {
        if (filmStrip[i].id === currentTemplates[0].id) {
          index = i - 1;
          break;
        }
      }

      if (index - 4 >= 0) {
        index = index - 4;
      } else if (index - 4 < 0) {
        index = 0;
      }

      // if (index <= 0) {
      //   setIsOnFirst(true);
      //   setIsOnLast(false);
      // } else {
      //   setIsOnFirst(false);
      //   setIsOnLast(false);
      // }

      disableButtons(index);

      setCurrentTemplates(filmStrip.slice(index, index + 4));
    }
  }

  useEffect(() => {
    // if (firstLoad) {
    //   setFirstLoad(false);
    //   loadThumbnail();
    // }
    loadImage();
  }, [selectedId, isOnFirst, isOnLast, currentTemplates]);

  return (
    <div className={styles.template_selector}>
      {largeImageUrl !== "" && (
        <img className={styles.large_image} src={largeImageUrl} />
      )}
      <div className={styles.details}>
        <span>TITLE: {currentThumbnail.title}</span>
        <br />
        <br />
        <span>DESCRIPTION: {currentThumbnail.description}</span>
        <br />
        <br />
        <span>COST: {currentThumbnail.cost}</span>
        <br />
        <br />
        <span>ID #: {currentThumbnail.id}</span>
        <br />
        <br />
        <span>THUMBNAIL FILE: {currentThumbnail.thumbnail}</span>
        <br />
        <br />
        <span>LARGE IMAGE FILE: {currentThumbnail.image}</span>
      </div>
      <div className={styles.template_list}>
        <div
          className={appendStyles([
            styles.button,
            isOnFirst && styles.disabled_button,
          ])}
        >
          <img
            src={prev.src}
            onClick={() => {
              loadPrevTemplates();
            }}
          />
        </div>
        {filmStrip.length > 0 &&
          currentTemplates.map((filmStrip) => (
            <div
              key={filmStrip.id}
              onClick={() => thumbnailClick(filmStrip)}
              className={styles.item}
            >
              <div>
                <img
                  className={appendStyles([
                    styles.image,
                    selectedId === filmStrip.id && styles.selected_image,
                  ])}
                  src={filmStrip.base64}
                />
              </div>
              <span
                className={appendStyles([
                  styles.thumb,
                  selectedId === filmStrip.id && styles.thumb_sel,
                ])}
              >
                {filmStrip.id}
              </span>
            </div>
          ))}
        <div
          className={appendStyles([
            styles.button,
            isOnLast && styles.disabled_button,
          ])}
        >
          <img
            src={next.src}
            onClick={() => {
              loadNextTemplates();
            }}
          />
        </div>
      </div>
    </div>
  );
};
