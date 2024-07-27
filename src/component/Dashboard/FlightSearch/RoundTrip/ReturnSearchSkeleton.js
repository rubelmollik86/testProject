import { Box, Grid, Skeleton, Stack } from "@mui/material";
import React from "react";

const ReturnSearchSkeleton = () => {
  return (
    <Box>
      <Box sx={{ marginBottom: "15px" }}>
        <Grid
          container
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
            },
            transition: "all .5s ease-in-out",
            borderRadius: "5px",
            overflow: "hidden",
            bgcolor: "var(--white)",
          }}
        >
          <Grid item md={10} p={2}>
            {/* for go flight  */}
            <Grid container columnSpacing={1}>
              {/* go 1st */}
              <Grid item xs={12} md={3}>
                <Box>
                  <Skeleton
                    sx={{ borderRadius: "50px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70px"}
                    height={"70px"}
                  />
                  {/* //todo: Text Part */}
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                  <Skeleton
                    sx={{ borderRadius: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>

              {/* go 2nd  */}
              <Grid item xs={12} md={3}>
                <Box>
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />

                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"40%"}
                    height={"13px"}
                  />

                  <Skeleton
                    sx={{
                      borderRadius: "5px",
                      marginBottom: "5px",
                      mt: { xs: "0", md: 5.5 },
                    }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>
              {/* 3rd  Animation and duration*/}
              <Grid item xs={4} md={3} py={2}>
                <Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      variant="rectangular"
                      width={"40%"}
                      height={"13px"}
                    />
                  </Box>

                  <Skeleton
                    sx={{
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={3} textAlign="end">
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      variant="rectangular"
                      width={"70%"}
                      height={"13px"}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{ borderRadius: "5px", marginBottom: "5px" }}
                      variant="rectangular"
                      width={"90%"}
                      height={"13px"}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{ borderRadius: "5px", marginBottom: "5px" }}
                      variant="rectangular"
                      width={"40%"}
                      height={"13px"}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                        mt: { xs: "0", md: 5.5 },
                      }}
                      variant="rectangular"
                      width={"90%"}
                      height={"13px"}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>

            {/* for back flight  */}
            <Grid container columnSpacing={1} mt={2}>
              {/* back 1st */}
              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                  }}
                >
                  {/* //todo: Image Part */}

                  <Skeleton
                    sx={{ borderRadius: "50px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70px"}
                    height={"70px"}
                  />
                  {/* //todo: Text Part */}
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                  <Skeleton
                    sx={{ borderRadius: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>
              {/* back 2nd  */}
              <Grid item xs={12} md={3}>
                <Box>
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"70%"}
                    height={"13px"}
                  />
                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />

                  <Skeleton
                    sx={{ borderRadius: "5px", marginBottom: "5px" }}
                    variant="rectangular"
                    width={"40%"}
                    height={"13px"}
                  />

                  <Skeleton
                    sx={{
                      borderRadius: "5px",
                      marginBottom: "5px",
                      mt: { xs: "0", md: 5.5 },
                    }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>
              {/* back 3rd  */}
              {/* 3rd  Animation and duration*/}
              <Grid item xs={4} md={3} py={2}>
                <Box>
                  <Box
                    sx={{
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      variant="rectangular"
                      width={"40%"}
                      height={"13px"}
                    />
                  </Box>

                  <Skeleton
                    sx={{
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                    variant="rectangular"
                    width={"90%"}
                    height={"13px"}
                  />
                </Box>
              </Grid>
              {/* back 4th  */}
              <Grid item xs={12} md={3} textAlign="end">
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                      }}
                      variant="rectangular"
                      width={"70%"}
                      height={"13px"}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{ borderRadius: "5px", marginBottom: "5px" }}
                      variant="rectangular"
                      width={"90%"}
                      height={"13px"}
                    />
                  </Box>

                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{ borderRadius: "5px", marginBottom: "5px" }}
                      variant="rectangular"
                      width={"40%"}
                      height={"13px"}
                    />
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Skeleton
                      sx={{
                        borderRadius: "5px",
                        marginBottom: "5px",
                        mt: { xs: "0", md: 5.5 },
                      }}
                      variant="rectangular"
                      width={"90%"}
                      height={"13px"}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* //todo: price section and flightDetails */}
          <Grid item md={2} p={2} textAlign="end">
            <Stack
              height="100%"
              direction="column"
              justifyContent="space-between"
              borderLeft="2px solid #F1EAF0"
            >
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Skeleton
                  sx={{
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}
                  variant="rectangular"
                  width={"80%"}
                  height={"13px"}
                />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Skeleton
                  sx={{
                    borderRadius: "5px",
                    marginBottom: "5px",
                  }}
                  variant="rectangular"
                  width={"80%"}
                  height={"32px"}
                />
              </Box>
            </Stack>
          </Grid>

          {/* //todo:Flight Details start------------ */}
        </Grid>
      </Box>
    </Box>
  );
};

export default ReturnSearchSkeleton;
