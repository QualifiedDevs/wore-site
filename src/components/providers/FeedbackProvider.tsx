export default function() {}

// import React, {
//   useState,
//   useEffect,
//   createContext,
//   useCallback,
// } from "react";
// import { styled } from "@mui/material/styles";
// import { Snackbar, Alert } from "@mui/material";

// enum FeedbackStatus {
//     ERROR = 0,
//     WARNING,
//     INFO,
//     SUCCESS
// }

// const StatusSevrityTable = {
//     ERROR: "error",
//     WARNING: "warning",
//     INFO: "info",
//     SUCCESS: "success", 
// }

// type Feedback = {
//   text: string;
//   status: FeedbackStatus;
// };

// type FeedbackContextValues = {
//   feedback?: Feedback;
//   setFeedback: React.Dispatch<Feedback>;
//   setSuccess: React.Dispatch<string>;
//   setError: React.Dispatch<string>;
// };

// const defaultContext = {};

// export const FeedbackContext = createContext(defaultContext);

// const FeedbackNotif = styled(({...props}) => {

//     const handleClose = useCallback(() => {

//     }, [])

//   return <Snackbar {...props} />;
// })``;

// export default function FeedbackProvider(props: any) {
//   const [feedback, setFeedback] = useState<Feedback>();

//   const setSuccess = useCallback((text: string) => {
//       setFeedback({text, status: FeedbackStatus.SUCCESS})
//   }, []);

//   const setError = useCallback((text: string) => {
//     setFeedback({text, status: FeedbackStatus.ERROR})
//   }, []);

//   const context: FeedbackContextValues = {
//     feedback,
//     setFeedback,
//     setSuccess,
//     setError,
//   };

//   return (
//     <FeedbackContext.Provider value={context}>
//       {props.children}
//       <FeedbackNotif {...context} />
//     </FeedbackContext.Provider>
//   );
// }