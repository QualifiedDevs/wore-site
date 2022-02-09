import { useContext } from "react";
import { FeedbackContext } from "@components/providers/FeedbackProvider";

export default function() {
    return useContext(FeedbackContext)
}