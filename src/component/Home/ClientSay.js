import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Skeleton, Stack, Typography } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import woman from "../../Assets/Ladies/woman.png";
import comma from "../../Assets/Ladies/comma.png";
import Slider from "react-slick";
import Modal from "@mui/material/Modal";
import { async } from "@firebase/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 350, md: 800 },
  bgcolor: "white",
  outline: "none",
  p: 3,
  borderRadius: "5px",
  overflow: "auto",
  height: {
    xs: "90%",
    sm: "auto",
  },
  display: "block",
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        // display: "block",
        display: "none",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
        background: "transparent",
        // display: "block",
        display: "none",
      }}
      onClick={onClick}
    />
  );
}

const ClientSay = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [testiMonialDetails, setTestimonialDetails] = useState("");
  const [slideLoad, setSlideLoad] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (data) => {
    setTestimonialDetails(data);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch(`https://flyfarladies-apiv2.appspot.com/testimonial/alltestimonila`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(true);
        setTestimonial(data?.alltestimonila);
      });
  }, []);

  let len;
  if (testimonial?.length !== 0) {
    len = testimonial?.length > 2 ? 2 : testimonial?.length;
  } else {
    len = slideLoad?.length > 2 ? 2 : slideLoad?.length;
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: len,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: len,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box pt={0} mb={20}>
      {testimonial.length !== 0 ? (
        <>
          <Typography
            sx={{
              fontSize: { xs: 20, sm: 25, md: 30 },
              fontWeight: 500,
              color: "var(--text-color-b)",
              my: { xs: 2, sm: 2, md: 4 },
            }}
          >
            What Our{" "}
            <span style={{ color: "var(--secondary-color)" }}>
              Clients Say ?
            </span>
          </Typography>
          <Box
            sx={{
              ".slick-slide > div": {
                margin: "1px 10px",
                width: "auto",
              },
              ".slick-list": {
                margin: "0px -10px",
              },
            }}
          >
            <>
              {loading ? (
                <Slider {...settings}>
                  {testimonial?.map((data, index, arr) => (
                    <div onClick={() => handleOpen(data)}>
                      <Box
                        sx={{
                          bgcolor: "var(--white)",
                          borderRadius: "10px",
                          cursor: "pointer",
                          height: {
                            md: "280px",
                          },
                          display: "flex",
                          alignItems: "center",
                          width: {
                            xs: `${arr.length === 1 ? "auto" : null}`,
                            md: `${arr.length === 1 ? "600px" : null}`,
                          },
                          margin: `${arr.length === 1 ? "auto" : "0"}`,
                        }}
                      >
                        <Grid container p={2} columnSpacing={2}>
                          <Grid item xs={12} md={4}>
                            <Box
                              sx={{
                                width: { xs: "60%", sm: "100%" },
                                height: { xs: "auto", sm: "220px" },
                                margin: { xs: "auto", sm: "" },
                              }}
                            >
                              <img
                                src={data?.ClientImage}
                                alt="Tours Package"
                                style={{
                                  borderRadius: "5px",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={8}
                            marginTop={{ xs: 1, md: 0 }}
                          >
                            <Stack
                              height="100%"
                              width="100%"
                              direction="column"
                              justifyContent="space-between"
                            >
                              <Box>
                                <Box mb={1}>
                                  <Stack direction="flex">
                                    <img
                                      src={comma}
                                      alt="icon"
                                      style={{
                                        width: "8px",
                                      }}
                                    />
                                    <img
                                      src={comma}
                                      alt="icon"
                                      style={{
                                        width: "8px",
                                      }}
                                    />
                                  </Stack>
                                </Box>
                                <Typography
                                  sx={{
                                    color: "var(--client-say-text)",
                                    fontSize: "13px",
                                    px: 3,
                                    textAlign: "justify",
                                  }}
                                >
                                  <Box
                                    dangerouslySetInnerHTML={{
                                      __html: `${data?.Description?.slice(
                                        0,
                                        240
                                      )}...`,
                                    }}
                                  />
                                  <span
                                    style={{ fontSize: "14px", color: "black" }}
                                  >
                                    Read More
                                  </span>
                                </Typography>
                                <Stack
                                  direction="flex"
                                  justifyContent="flex-end"
                                >
                                  <img
                                    src={comma}
                                    alt="icon"
                                    style={{
                                      transform: "rotate(180deg)",
                                      width: "8px",
                                    }}
                                  />
                                  <img
                                    src={comma}
                                    alt="icon"
                                    style={{
                                      transform: "rotate(180deg)",
                                      width: "8px",
                                    }}
                                  />
                                </Stack>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "var(--primary-color)",
                                    fontSize: "17px",
                                    fontWeight: 500,
                                  }}
                                  mt={2}
                                >
                                  {data?.ClientName}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "var(--tab-text)",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {data?.ClientDesignation}
                                </Typography>
                              </Box>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  ))}
                </Slider>
              ) : (
                <Slider {...settings}>
                  {slideLoad.map(function (slide) {
                    return (
                      <div>
                        <Box
                          sx={{
                            bgcolor: "var(--white)",
                            borderRadius: "10px",
                          }}
                        >
                          <Grid container p={2}>
                            <Grid item xs={12} md={4}>
                              <Box
                                style={{
                                  width: "100%",
                                  height: "80%",
                                  margin: "0px 0px",
                                  borderRadius: "5px",
                                  overFlow: "hidden",
                                }}
                              >
                                {/* <Skeleton
                                  sx={{ borderRadius: "5px" }}
                                  variant="rectangular"
                                  width={"100%"}
                                  height={"80%"}
                                /> */}
                              </Box>
                            </Grid>
                            <Grid item md={8} px={3}>
                              <Stack
                                height="100%"
                                direction="column"
                                justifyContent="space-between"
                                py={2}
                              >
                                <Box>
                                  <Box mb={1}>
                                    <Stack direction="flex">
                                      <img
                                        src={comma}
                                        alt="icon"
                                        style={{
                                          width: "6px",
                                        }}
                                      />
                                      <img
                                        src={comma}
                                        alt="icon"
                                        style={{
                                          width: "6px",
                                        }}
                                      />
                                    </Stack>
                                  </Box>
                                  <Box
                                    style={{
                                      width: "100%",
                                      height: "150px",
                                      margin: "0px 0px",
                                      borderRadius: "5px",
                                      overFlow: "hidden",
                                    }}
                                  >
                                    <Skeleton
                                      sx={{ borderRadius: "5px" }}
                                      variant="rectangular"
                                      width={"100%"}
                                      height={"100%"}
                                    />
                                  </Box>
                                  <Stack
                                    direction="flex"
                                    justifyContent="flex-end"
                                    my={1}
                                  >
                                    <img
                                      src={comma}
                                      alt="icon"
                                      style={{
                                        transform: "rotate(180deg)",
                                        width: "6px",
                                      }}
                                    />
                                    <img
                                      src={comma}
                                      alt="icon"
                                      style={{
                                        transform: "rotate(180deg)",
                                        width: "6px",
                                      }}
                                    />
                                  </Stack>
                                </Box>
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Box
                                    style={{
                                      width: "50%",
                                      height: "20px",
                                      margin: "0px 0px",
                                      borderRadius: "5px",
                                      overFlow: "hidden",
                                    }}
                                  >
                                    <Skeleton
                                      sx={{ borderRadius: "5px" }}
                                      variant="rectangular"
                                      width={"100%"}
                                      height={"80%"}
                                    />
                                  </Box>

                                  <Box
                                    style={{
                                      width: "50%",
                                      height: "20px",
                                      margin: "0px 0px",
                                      borderRadius: "5px",
                                      overFlow: "hidden",
                                    }}
                                  >
                                    <Skeleton
                                      sx={{ borderRadius: "5px" }}
                                      variant="rectangular"
                                      width={"100%"}
                                      height={"80%"}
                                    />
                                  </Box>
                                </Box>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    );
                  })}
                </Slider>
              )}
            </>
          </Box>
        </>
      ) : (
        ""
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style} width={{ xs: "300px", sm: "600px", md: "1000px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Box sx={{ width: "180px", height: "220px" }}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={testiMonialDetails?.ClientImage}
                  alt="testimonial"
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={9}>
              <Stack
                height="100%"
                direction="column"
                justifyContent="space-between"
                py={0}
              >
                <Box>
                  <Box>
                    <Stack direction="flex">
                      <img
                        src={comma}
                        alt="icon"
                        style={{
                          width: "8px",
                        }}
                      />
                      <img
                        src={comma}
                        alt="icon"
                        style={{
                          width: "8px",
                        }}
                      />
                    </Stack>
                  </Box>
                  <Typography
                    sx={{
                      color: "var(--client-say-text)",
                      fontSize: "12px",
                      px: 3,
                      textAlign: "justify",
                    }}
                  >
                    {testiMonialDetails?.Description?.slice(0, 1800)}
                  </Typography>
                  <Stack direction="flex" justifyContent="flex-end">
                    <img
                      src={comma}
                      alt="icon"
                      style={{
                        transform: "rotate(180deg)",
                        width: "8px",
                      }}
                    />
                    <img
                      src={comma}
                      alt="icon"
                      style={{
                        transform: "rotate(180deg)",
                        width: "8px",
                      }}
                    />
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography
                    sx={{
                      color: "var(--primary-color)",
                      fontSize: "17px",
                      fontWeight: 500,
                    }}
                    mt={1}
                  >
                    {testiMonialDetails?.ClientName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "var(--tab-text)",
                      fontSize: "13px",
                      fontWeight: 500,
                    }}
                  >
                    {testiMonialDetails?.ClientDesignation}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          {/* testimonial Image */}
          <Box mt={3}>
            <Grid container spacing={2}>
              {testiMonialDetails?.testimonialimages?.map((data) => (
                <Grid item xs={6} sm={6} md={2.4}>
                  <Box>
                    <img
                      style={{ width: "100%", height: "120px" }}
                      src={data}
                      alt="clientImage"
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ClientSay;
