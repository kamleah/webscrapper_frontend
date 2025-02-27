import { useEffect, useRef } from "react";

export default function PdfViewerComponent(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current; // This `useRef` instance will render the PDF.

    let PSPDFKit, instance;
    
    (async function () {
      PSPDFKit = await import("pspdfkit")

		PSPDFKit.unload(container) // Ensure that there's only one PSPDFKit instance.

      instance = await PSPDFKit.load({
        // Container where PSPDFKit should be mounted.
        container,
        // The document to open.
        document: props.document, 
        // Use the public directory URL as a base URL. PSPDFKit will download its library assets from here.
        baseUrl: `${window.location.protocol}//${window.location.host}/src/assets/pdflib/`,
        licenseKey: "AOZOwlZHQeKVL6aYwB3CiBXFuTlsq4xq2B_Rungp6RJAvqZfiS2tQ_RON_DFIvTyxVYnFNY1vFonZiCaPONDCXrKZhIsQlXSh3gYqM90VMEbX-ks1PK-QkcEz87Zj7gNv5XqIncsBXJtztUrlm4gxyIYuzO9Ooc_9P9PPBK4BONniMcyTtXyvkfy_c6Y2JXDz9cXvCfflYS30YIE",
        toolbarItems: [],
      });
     

    })();

    
    
    return () => PSPDFKit && PSPDFKit.unload(container)
  }, []);
  
  // This div element will render the document to the DOM.
  return <div ref={containerRef} style={{ width: "100%", height: "50vh" }} />
}