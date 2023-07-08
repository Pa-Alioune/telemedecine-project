import axios from "axios";

export const sendImages =
  (axiosPrivate) =>
  async ({ request }) => {
    const formData = await request.formData();
    for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
    const file = formData.get("dicom");
    let diconFormData = new FormData();
    diconFormData.append("file", file);

    try {
      let response = await axios.post(
        "http://localhost:8042/instances",
        diconFormData,
        {
          headers: {
            ContentType: "application/dicom",
            Accept: "application/dicom",
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };
