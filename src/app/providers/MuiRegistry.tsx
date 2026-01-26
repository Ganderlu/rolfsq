// "use client";

// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";
// import { useServerInsertedHTML } from "next/navigation";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import theme from "../theme/theme";
// import { ReactNode } from "react";

// const emotionCache = createCache({
//   key: "css",
//   prepend: true,
// });

// export default function MuiRegistry({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   useServerInsertedHTML(() => (
//     <style
//       data-emotion={`${emotionCache.key} ${Object.keys(
//         emotionCache.inserted
//       ).join(" ")}`}
//       dangerouslySetInnerHTML={{
//         __html: Object.values(emotionCache.inserted).join(" "),
//       }}
//     />
//   ));

//   return (
//     <CacheProvider value={emotionCache}>
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         {children}
//       </ThemeProvider>
//     </CacheProvider>
//   );
// }
