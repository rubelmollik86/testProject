import { Box, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./AlbumImgView.css";
import Footer from "../Home/Footer/Footer";

const AlbumImgView = () => {
  const location = useLocation();
  const albumImg = location?.state?.allData?.__albumImages__;
  // console.log(albumImg[0]?.AlbumTitle);
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Previous Image
  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(albumImg?.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  // Next Image
  const nextSlide = () => {
    slideNumber + 1 === albumImg?.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <Box>
      <Container>
        <Header />

        <Typography
          style={{
            fontSize: "20px",
            color: "var(--primary-color)",
            fontWeight: "500",
          }}
          my={2}
        >
          {albumImg[0]?.AlbumTitle} Photo Gallery
        </Typography>
        {openModal && (
          <div className="sliderWrap">
            <CloseIcon className="btnClose" onClick={handleCloseModal} />
            <ChevronLeftIcon className="btnPrev" onClick={prevSlide} />
            <ChevronRightIcon className="btnNext" onClick={nextSlide} />
            <div className="fullScreenImage" onClick={handleCloseModal}>
              <Box sx={{ width: "70%" }}>
                <img
                  style={{ height: "500px" }}
                  src={albumImg[slideNumber].albumImageUrl}
                  alt=""
                />
              </Box>
            </div>
          </div>
        )}

        <Grid container columnSpacing={1}>
          {albumImg &&
            albumImg.map((slide, index) => {
              return (
                <Grid item xs={12} sm={6} md={3}>
                  <div
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => handleOpenModal(index)}
                  >
                    <img
                      style={{ width: "100%", height: "200px" }}
                      src={slide.albumImageUrl}
                      alt=""
                    />
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </Container>
      <Box mt={20}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AlbumImgView;
