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
        description: "Başarılı bir HTTP isteğini temsil eder. İstek başarılı bir şekilde işlendi ve istemciye uygun yanıt döndü."
    },
    {
        code: 201,
        message: "Created",
        description: "İstek başarılı oldu ve sonucunda yeni bir kaynak oluşturuldu."
    },
    { 
        code: 202,
        message: "Accepted",
        description: "İstek başarılı bir şekilde alındı ancak işlenmesi hala devam ediyor."
    },
    { 
        code: 203,
        message: "Non-Authoritative Information",
        description: "Sunucunun sunduğu yanıt, kaynağın kendisinden değil, başka bir yerden alınmış olabilir."
    },
    { 
        code: 204,
        message: "No Content",
        description: "Sunucu isteği başarılı bir şekilde yerine getirdi ancak herhangi bir içerik döndürmek zorunda değil."
    },
    { 
        code: 205,
        message: "Reset Content",
        description: "Sunucu, istemcinin mevcut belge görünümünü sıfırlaması gerektiğini belirtir."
    },
    { 
        code: 206,
        message: "Partial Content",
        description: "Sunucu, istemcinin belirli bir kısmını istediği bir kaynağı başarıyla gönderir."
    },
    { 
        code: 207,
        message: "Multi-Status",
        description: "Birden fazla kaynağın durumu veya işlemi hakkında bilgi içeren bir yanıt."
    },
    { 
        code: 208,
        message: "Already Reported",
        description: "Sunucu, istemcinin daha önce rapor edilen bir durumu tekrarladığını belirtir."
    },
    { 
        code: 226,
        message: "IM Used",
        description: "Sunucu, kısmi içeriği alırken Integritiyi Doğrula (IM) kullanarak başarıyla gönderdi."
    }
];


 const Redirection = [
  { 
      code: 300, 
      message: "Multiple Choices",
      description: "Sunucu, istemcinin isteğini yerine getirmek için birden fazla kaynak buldu ve bu kaynaklar arasından birini seçmesi gerektiğini belirtir."
  },
  { 
      code: 301, 
      message: "Moved Permanently",
      description: "Sunucu, istemcinin istediği kaynağın kalıcı olarak başka bir konuma taşındığını belirtir. Bu durum, gelecekte doğrudan yeni konumu kullanması gerektiğini ifade eder."
  },
  { 
      code: 302, 
      message: "Found",
      description: "Sunucu, istemcinin isteği geçici olarak başka bir konuma yönlendirdiğini belirtir. Ancak, istemcinin orijinal konuma geri dönebileceğini belirtir."
  },
  { 
      code: 303, 
      message: "See Other",
      description: "Sunucu, istemcinin bir başka URI'ye GET isteği göndermesi gerektiğini belirtir."
  },
  { 
      code: 304,
      message: "Not Modified",
      description: "Tarayıcı önbelleği için kullanılır. Sunucu, isteğin gövdesini değiştirmemişse, istemciye aynı yanıtı tekrar kullanmasını söyler."
  },
  { 
      code: 307, 
      message: "Temporary Redirect",
      description: "Sunucu, istemcinin isteği geçici olarak başka bir konuma yönlendirdiğini belirtir. İstemci, orijinal metodu korumalıdır."
  },
  { 
      code: 308, 
      message: "Permanent Redirect",
      description: "Sunucu, istemcinin isteği kalıcı olarak başka bir konuma yönlendirdiğini belirtir. İstemci, orijinal metodu korumalıdır."
  }
];


const ClientError = [
  {
      code: 400,
      message: "Bad Request",
      description: "Sunucu, isteği anlayamaz veya işleyemez. Genellikle istemcinin gönderdiği verilerde bir hata olduğunu gösterir."
  },
  {
      code: 401,
      message: "Unauthorized",
      description: "İstek, kimlik doğrulama gerektirir ancak kullanıcı doğrulanamadı veya yetkilendirme bilgileri sağlanmadı."
  },
  { 
      code: 402, 
      message: "Payment Required",
      description: "Bu durum kodu artık kullanılmamaktadır ve gelecekte kullanılmayacaktır."
  },
  {
      code: 403,
      message: "Forbidden",
      description: "Sunucu, isteği kabul etmeyi reddetti çünkü kullanıcının gerekli izinlere sahip olmadığını düşünüyor."
  },
  {
      code: 404,
      message: "Not Found",
      description: "İstek, geçerli ancak sunucuda istenen kaynak bulunamadı."
  },
  { 
      code: 405, 
      message: "Method Not Allowed",
      description: "Sunucu, istemcinin belirtilen HTTP yöntemini kullanmasına izin vermiyor."
  },
  { 
      code: 406, 
      message: "Not Acceptable",
      description: "Sunucu, istemcinin kabul edilemez bir yanıt içeriği türü istediğini belirtir."
  },
  { 
      code: 407, 
      message: "Proxy Authentication Required",
      description: "İstemci, bir proxy sunucusuna erişirken kimlik doğrulaması gerektiğini belirtir."
  },
  { 
      code: 408, 
      message: "Request Timeout",
      description: "Sunucu, istemcinin isteğine yanıt vermek için gereken sürede yanıt vermedi."
  },
  {
      code: 409,
      message: "Conflict",
      description: "İstek, kaynağın mevcut durumuyla uyumsuz olduğunda gönderilir, genellikle aynı anda yapılan güncellemelerle ilgilidir."
  },
  {
      code: 410,
      message: "Gone",
      description: "İstenen kaynak artık sunucuda mevcut değil ve artık mevcut olmayacak."
  },
  { 
      code: 411, 
      message: "Length Required",
      description: "Sunucu, istemcinin içeriğin uzunluğunu belirtmediğini belirtir."
  },
  { 
      code: 412, 
      message: "Precondition Failed",
      description: "Sunucu, istemcinin isteğinin bir veya daha fazla önkoşulunu karşılayamadığını belirtir."
  },
  { 
      code: 413, 
      message: "Payload Too Large",
      description: "Sunucu, istemcinin gönderdiği istek varlığının boyutunun sınırlarının ötesinde olduğunu belirtir."
  },
  { 
      code: 414, 
      message: "URI Too Long",
      description: "Sunucu, istemcinin isteğindeki URI'nin çok uzun olduğunu belirtir."
  },
  { 
      code: 415, 
      message: "Unsupported Media Type",
      description: "Sunucu, istemcinin gönderdiği medya türünü desteklemediğini belirtir."
  },
  { 
      code: 416, 
      message: "Range Not Satisfiable",
      description: "Sunucu, istemcinin talep ettiği kaynağın bir kısmını almak için bir aralık istediğini belirtir, ancak sunucu bu aralığı sağlayamıyor."
  },
  { 
      code: 417, 
      message: "Expectation Failed",
      description: "Sunucu, istemcinin beklediği belirli beklentileri karşılayamadığını belirtir."
  },
  { 
      code: 418, 
      message: "I'm a Teapot",
      description: "Sunucu, 'Hyper Text Coffee Pot Control Protocol' uyarınca bir kahve makinesi olduğunu belirtir ve bir isteğin işlenmesi için uygun olmadığını belirtir."
  },
  { 
      code: 421, 
      message: "Misdirected Request",
      description: "Sunucu, isteği yanlış bir kaynağa veya sunucuya yönlendirdiğini belirtir."
  },
  { 
      code: 422, 
      message: "Unprocessable Entity",
      description: "Sunucu, istemcinin isteği işlemek için uygun olmadığını belirtir, genellikle doğrulama veya veri doğrulama hatalarıyla ilgilidir."
  },
  { 
      code: 423, 
      message: "Locked",
      description: "Sunucu, istemcinin talep ettiği kaynağın geçici olarak kilitlendiğini belirtir ve daha sonra tekrar erişilebileceğini belirtir."
  },
  { 
    code: 424, 
    message: "Failed Dependency",
    description: "Sunucu, bir veya daha fazla isteğin başarısız olduğunu ve son isteğin bu nedenle başarısız olduğunu belirtir."
},
{ 
    code: 425, 
    message: "Too Early",
    description: "Sunucu, istemcinin isteğini henüz işleyemeyeceğini belirtir."
},
{ 
    code: 428, 
    message: "Precondition Required",
    description: "Sunucu, istemcinin belirli önkoşulları sağlaması gerektiğini belirtir."
},
{ 
    code: 429, 
    message: "Too Many Requests",
    description: "Sunucu, istemcinin belirli bir süre içinde çok fazla istek gönderdiğini belirtir ve istekleri sınırlar."
},
{ 
    code: 431, 
    message: "Request Header Fields Too Large",
    description: "Sunucu, istemcinin isteğindeki başlık alanlarının boyutunun sınırlarının ötesinde olduğunu belirtir."
},
{ 
    code: 451, 
    message: "Unavailable For Legal Reasons",
    description: "Sunucu, istemcinin belirli bir kaynağa erişimin yasal nedenlerle kısıtlandığını belirtir."
}
];

const ServerError = [
  {
      code: 500,
      message: "Internal Server Error",
      description: "Sunucu, beklenmeyen bir hatayla karşılaştığı için isteği yerine getiremedi."
  },
  { 
      code: 501, 
      message: "Not Implemented",
      description: "Sunucu, istemcinin isteğini yerine getirmek için gerekli olan işlemi gerçekleştiremiyor."
  },
  { 
      code: 502, 
      message: "Bad Gateway",
      description: "Sunucu, bir ağ geçidinden geçerken geçersiz bir yanıt aldı."
  },
  { 
      code: 503, 
      message: "Service Unavailable",
      description: "Sunucu, şu anda hizmet veremiyor. Bu genellikle aşırı yüklenme veya bakım nedeniyle geçici bir durum olabilir."
  },
  { 
      code: 504, 
      message: "Gateway Timeout",
      description: "Sunucu, bir ağ geçidinden yanıt alırken zaman aşımına uğradı."
  },
  { 
      code: 505, 
      message: "HTTP Version Not Supported",
      description: "Sunucu, istemcinin kullandığı HTTP sürümünü desteklemiyor."
  },
  { 
      code: 506, 
      message: "Variant Also Negotiates",
      description: "Sunucu, istemcinin talep ettiği kaynağın varyantı mevcut olmayabilir."
  },
  { 
      code: 507, 
      message: "Insufficient Storage",
      description: "Sunucu, isteği yerine getirmek için gerekli olan depolama alanının tükendiğini belirtir."
  },
  { 
      code: 508, 
      message: "Loop Detected",
      description: "Sunucu, isteği işlemeye çalışırken bir döngü algıladı."
  },
  { 
      code: 509, 
      message: "Bandwidth Limit Exceeded",
      description: "Bu durum kodu için resmi bir tanım bulunmamaktadır."
  },
  { 
      code: 510, 
      message: "Not Extended",
      description: "Sunucu, istemcinin gönderdiği isteği işlemek için uzantı gerektirir."
  },
  { 
      code: 511, 
      message: "Network Authentication Required",
      description: "Sunucu, erişmek istediği kaynağa erişmek için istemcinin bir ağ kimlik doğrulaması gerektiğini belirtir."
  }
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
