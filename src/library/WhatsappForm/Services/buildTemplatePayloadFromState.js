/* eslint-disable no-case-declarations */

const buildTemplatePayloadFromState = async ({ templateMessageValue, contactNumber }) => {
  if (!templateMessageValue || !templateMessageValue.template?.value) {
    console.warn(" No template selected or template data missing.");
    return null;
  }

  // console.log(templateMessageValue)
  const template = templateMessageValue.template.value;
  const components = template.template_components || [];

  // HEADER
  const headerComponent = components.find(c => c.type === "HEADER");
  const headerFormat = headerComponent?.format?.toLowerCase() || "text";

  let header_variables = [];

  switch (headerFormat) {
    case "image":
    case "video":
    case "document":
      const uploadedMediaUrl = templateMessageValue.media_url || "";
      header_variables = [uploadedMediaUrl];
      break;

    case "location":
      const location = templateMessageValue.location || {};
      header_variables = [
        {
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          name: location.name || "",
          address: location.address || "",
        },
      ];
      break;

    case "text":
    default:
      header_variables = Object.values(templateMessageValue.header || {});
      break;
  }

  // BODY
  const bodyValues = Object.values(templateMessageValue.body || {})
    .map(val => val?.trim())
    .filter(Boolean);

  const button_variables = Array.isArray(templateMessageValue.button_variables)
    ? templateMessageValue.button_variables
    : [""];

  return {
    to: contactNumber,
    type: "template",
    template_id: template._id,
    header_variables,
    body_variables: bodyValues,
    button_variables,
    priority: "1",
  };
};

export default buildTemplatePayloadFromState;
