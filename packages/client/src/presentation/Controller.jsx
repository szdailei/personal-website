import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Article } from '../sectioning/index.js';

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

function Controller({ data }) {
  const [currentPageCount, setCurrentPageCount] = useState(0);
  const [isAllPages, setIsAllPages] = useState(false);

  const onKeyDown = useCallback(
    (event) => {
      if (isAllPages) {
        switch (event.code) {
          case 'KeyA':
            event.preventDefault();
            setIsAllPages(!isAllPages);
            break;
          default:
            break;
        }
        return;
      }

      switch (event.code) {
        case 'KeyA':
          event.preventDefault();
          setIsAllPages(!isAllPages);
          break;
        case 'KeyF':
          event.preventDefault();
          if (document.fullscreenEnabled) toggleFullScreen();
          break;
        case 'Space':
        case 'PageDown':
        case 'Numpad3':
          event.preventDefault();
          if (currentPageCount < data.length - 1) {
            setCurrentPageCount(currentPageCount + 1);
          }
          break;
        case 'PageUp':
        case 'Numpad9':
          event.preventDefault();
          if (currentPageCount > 0) {
            setCurrentPageCount(currentPageCount - 1);
          }
          break;
        case 'Home':
        case 'Numpad7':
          event.preventDefault();
          setCurrentPageCount(0);
          break;
        case 'End':
        case 'Numpad1':
          event.preventDefault();
          setCurrentPageCount(data.length - 1);
          break;
        default:
          break;
      }
    },
    [data, currentPageCount, isAllPages]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  const showData = isAllPages ? data : data[currentPageCount];
  return <Article fontSize="1.8em">{showData}</Article>;
}

Controller.propTypes = {
  data: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Controller;
