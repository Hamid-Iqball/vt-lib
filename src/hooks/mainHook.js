import { useState } from "react";
import axios from "axios";

import useIntMessages from "./IntMessageHook";
import buildTemplatePayloadFromState from "../library/WhatsappForm/Services/buildTemplatePayloadFromState";

const useMainServices = ({ whatsappInitialFormValue, templateMessageValue }) => {
  const { intMsgState } = useIntMessages();
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const sendWhatsForm = async (messageType) => {
    const { phone_number, hash_key } = whatsappInitialFormValue || {};

    if (!phone_number || !hash_key) {
      console.warn(" Missing phone number or hash key");
      return;
    }

    let messageData = null;

    try {
      setLoading(true);

      if (messageType === 1) {
       
         messageData = await buildTemplatePayloadFromState({
          templateMessageValue,
          contactNumber: phone_number,
        });

        if (!messageData) {
          console.warn(" Failed to build template payload");
          return;
        }
      } else {
     
        messageData = {
          ...intMsgState,
          type: "template", // or "text" if needed
        };
      }

      console.log(" Final Payload to Send:", messageData);

      const response = await axios.post(
        "http://172.18.0.34:5020/wa/v1/send_message",
        messageData,
        {
          headers: {
            hash: hash_key,
          },
        }
      );

      setApiResponse(response.data);
      console.log(" Message sent:", response.data);
    } catch (error) {
      const err = error.response?.data || error.message;
      console.error(" Error during message sending:", err);
      setApiResponse({ STATUS: "ERROR", ERROR: err });
    } finally {
      setLoading(false);
    }
  };

  return {
    sendWhatsForm,
    loading,
    apiResponse,
  };
};

export default useMainServices;
