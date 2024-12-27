import { retry } from "@reduxjs/toolkit/query";
import React from "react";
import { TouchableOpacity } from "react-native";
import Svg, {
  Defs,
  G,
  Path,
  Rect,
  ClipPath,
  Use,
  Pattern,
  Image,
  Polygon,
  TSpan,
  Circle,
  Text,
  Ellipse,
} from "react-native-svg";



const Icon = ({ iconName, onPress, color, height, width, size }) => {
  switch (iconName) {
    case "plus":
      return (
        <Svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        enableBackground="new 0 0 512 512"
        width={size}
        height={size}
        fill={color}
      >
        <Path d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
      </Svg>
      );
    case "favorite":
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill={color} >
          <Path
            d="M13.083 3.333c2.642 0 4.417 2.484 4.417 4.8 0 4.692-7.367 8.534-7.5 8.534s-7.5-3.842-7.5-8.534c0-2.316 1.775-4.8 4.417-4.8 1.516 0 2.508.759 3.083 1.425.575-.666 1.567-1.425 3.083-1.425z"
            stroke={"#000"}
            strokeLinecap="round"
            strokeLinejoin="round"

          />
        </Svg>
      );
    case "basket":
      return (
        <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
          <Path
            d="M1.667 1.667V15A3.333 3.333 0 005 18.333h10A3.333 3.333 0 0018.333 15V1.667H1.667z"
            stroke="#000"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M14.167 5v1.667a4.167 4.167 0 01-8.334 0V5"
            stroke="#000"
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "search":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M15.714 6.838a6.276 6.276 0 11-8.876 8.876 6.276 6.276 0 018.876-8.876M19 19l-3.29-3.29"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case "arrowLeft":
      return (
        <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" >
          <Path
            d="M8.667 12.667L14 8 8.667 3.333M14 8H2"
            stroke="#3F174B"
            strokeWidth={1.33333}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "enter":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" >
          <Path
            d="M12.25 5l9.5 7-9.5 7"
            stroke="#000"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M2.25 19a7 7 0 017-7h12"
            stroke="#000"
            strokeWidth={2}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case "back":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 240.823 240.823"
          xmlSpace="preserve"
          enableBackground="new 0 0 240.823 240.823"
          width={size}
          height={size}
        >
          <Path d="M57.633 129.007L165.93 237.268c4.752 4.74 12.451 4.74 17.215 0 4.752-4.74 4.752-12.439 0-17.179l-99.707-99.671 99.695-99.671c4.752-4.74 4.752-12.439 0-17.191-4.752-4.74-12.463-4.74-17.215 0L57.621 111.816c-4.679 4.691-4.679 12.511.012 17.191z" />
        </Svg>
      );
    case "delete":
      return (
        <Svg
          height={size}
          viewBox="0 0 512 512"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"

        >
          <Path
            d="M170.8 14.221A14.21 14.21 0 01185 .014L326.991.006a14.233 14.233 0 0114.2 14.223v35.117H170.8zm233.461 477.443a21.75 21.75 0 01-21.856 20.33H127.954a21.968 21.968 0 01-21.854-20.416L84.326 173.06H427.5l-23.234 318.6zm56.568-347.452H51.171v-33A33.035 33.035 0 0184.176 78.2l343.644-.011a33.051 33.051 0 0133 33.02v33zm-270.79 291.851a14.422 14.422 0 1028.844 0V233.816a14.42 14.42 0 00-28.839-.01v202.257zm102.9 0a14.424 14.424 0 1028.848 0V233.816a14.422 14.422 0 00-28.843-.01z"
            fill="#fc0005"
            fillRule="evenodd"
          />
        </Svg>
      );

    case "category":
      return (
        <Svg
          height={size}
          viewBox="0 0 64 64"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          fill={color}

        >
          <Path d="M55.3 62H41.7C38 62 35 59 35 55.3V37c0-1.1.9-2 2-2h18.3c3.7 0 6.7 3 6.7 6.7v13.6c0 3.7-3 6.7-6.7 6.7zM39 39v16.3c0 1.5 1.2 2.7 2.7 2.7h13.6c1.5 0 2.7-1.2 2.7-2.7V41.7c0-1.5-1.2-2.7-2.7-2.7zM22.3 62H8.7C5 62 2 59 2 55.3V41.7C2 38 5 35 8.7 35H27c1.1 0 2 .9 2 2v18.3c0 3.7-3 6.7-6.7 6.7zM8.7 39C7.2 39 6 40.2 6 41.7v13.6C6 56.8 7.2 58 8.7 58h13.6c1.5 0 2.7-1.2 2.7-2.7V39zM55.3 29H37c-1.1 0-2-.9-2-2V8.7C35 5 38 2 41.7 2h13.6C59 2 62 5 62 8.7v13.6c0 3.7-3 6.7-6.7 6.7zM39 25h16.3c1.5 0 2.7-1.2 2.7-2.7V8.7C58 7.2 56.8 6 55.3 6H41.7C40.2 6 39 7.2 39 8.7zM27 29H8.7C5 29 2 26 2 22.3V8.7C2 5 5 2 8.7 2h13.6C26 2 29 5 29 8.7V27c0 1.1-.9 2-2 2zM8.7 6C7.2 6 6 7.2 6 8.7v13.6C6 23.8 7.2 25 8.7 25H25V8.7C25 7.2 23.8 6 22.3 6z" />
        </Svg>
      );

    case "edit":
      return (
        <Svg
          height={size}
          width={size}
          viewBox="0 -1 401.52289 401"
          xmlns="http://www.w3.org/2000/svg"

        >
          <Path d="M370.59 250.973c-5.524 0-10 4.476-10 10v88.789c-.02 16.562-13.438 29.984-30 30H50c-16.563-.016-29.98-13.438-30-30V89.172c.02-16.559 13.438-29.98 30-30h88.79c5.523 0 10-4.477 10-10 0-5.52-4.477-10-10-10H50c-27.602.031-49.969 22.398-50 50v260.594c.031 27.601 22.398 49.968 50 50h280.59c27.601-.032 49.969-22.399 50-50v-88.793c0-5.524-4.477-10-10-10zm0 0" />
          <Path d="M376.629 13.441c-17.574-17.574-46.067-17.574-63.64 0L134.581 191.848a9.997 9.997 0 00-2.566 4.402l-23.461 84.7a9.997 9.997 0 0012.304 12.308l84.7-23.465a9.997 9.997 0 004.402-2.566l178.402-178.41c17.547-17.587 17.547-46.055 0-63.641zM156.37 198.348L302.383 52.332l47.09 47.09-146.016 146.016zm-9.406 18.875l37.62 37.625-52.038 14.418zM374.223 74.676L363.617 85.28l-47.094-47.094 10.61-10.605c9.762-9.762 25.59-9.762 35.351 0l11.739 11.734c9.746 9.774 9.746 25.59 0 35.36zm0 0" />
        </Svg>
      );

    case "down":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width={size}
          height={size}
          viewBox="0 0 451.847 451.847"
          xmlSpace="preserve"
          enableBackground="new 0 0 451.847 451.847"

        >
          <Path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
        </Svg>
      );

    case "up":
      return (
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 240.835 240.835"
          xmlSpace="preserve"
          enableBackground="new 0 0 240.835 240.835"
          width={size}
          height={size}
          fill={"white"}
        >
          <Path d="M129.007 57.819c-4.68-4.68-12.499-4.68-17.191 0L3.555 165.803c-4.74 4.74-4.74 12.427 0 17.155 4.74 4.74 12.439 4.74 17.179 0l99.683-99.406 99.671 99.418c4.752 4.74 12.439 4.74 17.191 0 4.74-4.74 4.74-12.427 0-17.155L129.007 57.819z" />
        </Svg>
      );



    default:
      break;
  }
};

export default Icon;
