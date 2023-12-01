import React from "react";
import { Box, Grid } from "@mui/material";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface CustomPaginationProps {
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  page,
  count,
  onChange,
}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" mt={0}>
      <Grid item xs={4}>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (page !== 1) {
                onChange(
                  event as React.ChangeEvent<unknown>,
                  Math.max(page - 1, 1)
                );
              }
            }}
            aria-disabled={page === 1}
          >
            <span
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "4vw",
                fontWeight: "bold",
              }}
            >
              <MdOutlineKeyboardDoubleArrowLeft />
            </span>
          </a>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          className="custom-pagination-box gridNavigate"
          sx={{
            position: "relative",
            padding: "1vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "White",
            fontSize: "5vw",

            fontFamily: "VT323",
            fontWeight: "bold",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            paddingTop: "0.5vw",
            backgroundImage: "url('./assets/fundoPagination.png')",
          }}
        >
          Box {page}
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box
          sx={{
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              if (page !== count) {
                onChange(
                  event as React.ChangeEvent<unknown>,
                  Math.min(page + 1, count)
                );
              }
            }}
            aria-disabled={page === count}
          >
            <span
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "4vw",
                fontWeight: "bold",
              }}
            >
              <MdOutlineKeyboardDoubleArrowRight />
            </span>
          </a>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomPagination;
