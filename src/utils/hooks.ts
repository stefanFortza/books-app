import { useLiveQuery } from "dexie-react-hooks";
import api from "../api/API";

export function useAPI() {
  return api;
}
