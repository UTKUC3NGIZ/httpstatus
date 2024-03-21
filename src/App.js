import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
function App() {
  const [selectedStatusCode, setSelectedStatusCode] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleButtonClick = (statusCode) => {
    fetch(`https://mock.httpstatus.io/${statusCode}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        setSelectedStatusCode(statusCode);
        setResponseMessage(data);
      })
      .catch((error) => {
        setSelectedStatusCode(statusCode);
        setResponseMessage(`Error: ${error.message}`);
      });
  };

  const Success = [
    {
      code: 200,
      message: "OK",
      description:
        "Başarılı bir HTTP isteğini temsil eder. İstek başarılı bir şekilde işlendi ve istemciye uygun yanıt döndü.",
    },
    {
      code: 201,
      message: "Created",
      description:
        "İstek başarılı oldu ve sonucunda yeni bir kaynak oluşturuldu.",
    },
    { code: 202, message: "Accepted" },
    { code: 203, message: "Non-Authoritative Information" },
    {
      code: 204,
      message: "No Content",
      description:
        "Sunucu isteği başarılı bir şekilde yerine getirdi ancak herhangi bir içerik döndürmek zorunda değil.",
    },
    { code: 205, message: "Reset Content" },
    { code: 206, message: "Partial Content" },
    { code: 207, message: "Multi-Status" },
    { code: 208, message: "Already Reported" },
    { code: 226, message: "IM Used" },
  ];

  const Redirection = [
    { code: 300, message: "Multiple Choices" },
    { code: 301, message: "Moved Permanently" },
    { code: 302, message: "Found" },
    { code: 303, message: "See Other" },
    {
      code: 304,
      message: "Not Modified",
      description:
        "Tarayıcı önbelleği için kullanılır. Sunucu, isteğin gövdesini değiştirmemişse, istemciye aynı yanıtı tekrar kullanmasını söyler.",
    },
    { code: 307, message: "Temporary Redirect" },
    { code: 308, message: "Permanent Redirect" },
  ];

  const ClientError = [
    {
      code: 400,
      message: "Bad Request",
      description:
        "Sunucu, isteği anlayamaz veya işleyemez. Genellikle istemcinin gönderdiği verilerde bir hata olduğunu gösterir.",
    },
    {
      code: 401,
      message: "Unauthorized",
      description:
        " İstek, kimlik doğrulama gerektirir ancak kullanıcı doğrulanamadı veya yetkilendirme bilgileri sağlanmadı.",
    },
    { code: 402, message: "Payment Required" },
    {
      code: 403,
      message: "Forbidden",
      description:
        "Sunucu, isteği kabul etmeyi reddetti çünkü kullanıcının gerekli izinlere sahip olmadığını düşünüyor.",
    },
    {
      code: 404,
      message: "Not Found",
      description: "İstek, geçerli ancak sunucuda istenen kaynak bulunamadı.",
    },
    { code: 405, message: "Method Not Allowed" },
    { code: 406, message: "Not Acceptable" },
    { code: 407, message: "Proxy Authentication Required" },
    { code: 408, message: "Request Timeout" },
    {
      code: 409,
      message: "Conflict",
      description:
        "İstek, kaynağın mevcut durumuyla uyumsuz olduğunda gönderilir, genellikle aynı anda yapılan güncellemelerle ilgilidir.",
    },
    {
      code: 410,
      message: "Gone",
      description:
        "İstenen kaynak artık sunucuda mevcut değil ve artık mevcut olmayacak.",
    },
    { code: 411, message: "Length Required" },
    { code: 412, message: "Precondition Failed" },
    { code: 413, message: "Payload Too Large" },
    { code: 414, message: "URI Too Long" },
    { code: 415, message: "Unsupported Media Type" },
    { code: 416, message: "Range Not Satisfiable" },
    { code: 417, message: "Expectation Failed" },
    { code: 418, message: "I'm a Teapot" },
    { code: 421, message: "Misdirected Request" },
    { code: 422, message: "Unprocessable Entity" },
    { code: 423, message: "Locked" },
    { code: 424, message: "Failed Dependency" },
    { code: 425, message: "Too Early" },
    { code: 428, message: "Precondition Required" },
    { code: 429, message: "Too Many Requests" },
    { code: 431, message: "Request Header Fields Too Large" },
    { code: 451, message: "Unavailable For Legal Reasons" },
  ];

  const ServerError = [
    {
      code: 500,
      message: "Internal Server Error",
      description:
        "Sunucu, beklenmeyen bir hatayla karşılaştığı için isteği yerine getiremedi.",
    },
    { code: 501, message: "Not Implemented" },
    { code: 502, message: "Bad Gateway" },
    { code: 503, message: "Service Unavailable" },
    { code: 504, message: "Gateway Timeout" },
    { code: 505, message: "HTTP Version Not Supported" },
    { code: 506, message: "Variant Also Negotiates" },
    { code: 507, message: "Insufficient Storage" },
    { code: 508, message: "Loop Detected" },
    { code: 509, message: "Bandwidth Limit Exceeded" },
    { code: 510, message: "Not Extended" },
    { code: 511, message: "Network Authentication Required" },
  ];

  return (
    <div className="bg-gray-800 h-full">
      <h1 className="text-3xl font-bold pl-14 pb-6 pt-6 text-white">
        HTTP Status
      </h1>
      <div className="flex gap-8 flex-col px-12">
        <div>
          <h1 className="text-2xl text-[#31cd64] ml-2 mb-4">2xx: Success</h1>
          {Success.map(({ code, message }) => (
            <button
              key={code}
              onClick={() => {
                handleButtonClick(code);
                setOpen(true);
              }}
              className={`p-4 border m-2 border-gray-300 rounded-md shadow-md hover:shadow-lg focus:outline-none transition-colors text-white bg-[#31cd64] `}
            >
              {code} - {message}
            </button>
          ))}
        </div>
        <div>
          <h1 className="text-2xl text-[#09f] ml-2 mb-4">3xx: Redirection</h1>

          {Redirection.map(({ code, message }) => (
            <button
              key={code}
              onClick={() => {
                handleButtonClick(code);
                setOpen(true);
              }}
              className={`p-4 border m-2 border-gray-300 rounded-md shadow-md hover:shadow-lg focus:outline-none transition-colors text-white bg-[#09f] `}
            >
              {code} - {message}
            </button>
          ))}
        </div>
        <div>
          <h1 className="text-2xl text-[#fda92a] ml-2 mb-4">
            4xx: Client error
          </h1>

          {ClientError.map(({ code, message }) => (
            <button
              key={code}
              onClick={() => {
                handleButtonClick(code);
                setOpen(true);
              }}
              className={`p-4 border m-2 border-gray-300 rounded-md shadow-md hover:shadow-lg focus:outline-none transition-colors text-white bg-[#fda92a] `}
            >
              {code} - {message}
            </button>
          ))}
        </div>
        <div>
          <h1 className="text-2xl text-[#fc4f52] ml-2 mb-4">
            5xx: Server error
          </h1>
          {ServerError.map(({ code, message }) => (
            <button
              key={code}
              onClick={() => {
                handleButtonClick(code);
                setOpen(true);
              }}
              className={`p-4 border m-2 border-gray-300 rounded-md shadow-md hover:shadow-lg focus:outline-none transition-colors text-white bg-[#fc4f52] `}
            >
              {code} - {message}
            </button>
          ))}
        </div>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div className="px-4 flex gap-4 flex-col ">
                    {selectedStatusCode && (
                      <p className="text-2xl text-black">
                        Status Code: {selectedStatusCode}
                      </p>
                    )}

                    {selectedStatusCode &&
                      Success.concat(
                        Redirection,
                        ClientError,
                        ServerError
                      ).find(({ code }) => code === selectedStatusCode)
                        ?.description && (
                        <p className="text-black text-lg font-semibold">
                          Açıklama:{" "}
                          {
                            Success.concat(
                              Redirection,
                              ClientError,
                              ServerError
                            ).find(({ code }) => code === selectedStatusCode)
                              .description
                          }
                        </p>
                      )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default App;
