import React, { createContext, useContext, useEffect, useState } from "react";
import { Animated, View } from "react-native";
import { Portal, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const VersionContext = createContext(null);

