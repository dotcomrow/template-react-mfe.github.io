import axios from "axios";
import { lookupCodesCacheKey } from "../constants";

const loadLookupCodes = async (url) => {
  if (window[lookupCodesCacheKey] == null) {
    const response = await axios.get(url);
    window[lookupCodesCacheKey] = response.data;
    return response.data;
  } else {
    return window[lookupCodesCacheKey];
  }
};

export const getLookupCode = (code, def) => {
  if (window[lookupCodesCacheKey] == null) {
    loadLookupCodes("<LOOKUP_CODES_URL>");
  } else {
    if (window[lookupCodesCacheKey][code] != null) {
      return window[lookupCodesCacheKey][code];
    } else {
      return def;
    }
  }
};
