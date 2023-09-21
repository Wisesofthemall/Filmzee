require("dotenv").config();
import { postVideos } from "@/database/Supabase";
import axios from "axios";

const ExampleData = {
  kind: "youtube#searchListResponse",
  etag: "PVX_C4d1UlHc7z_PXEAdogLDgqY",
  nextPageToken: "CB4QAA",
  regionCode: "US",
  pageInfo: {
    totalResults: 1000000,
    resultsPerPage: 30,
  },
  items: [
    {
      kind: "youtube#searchResult",
      etag: "XXtlL7Tl2tJkYiEohCFTSHUol8Y",
      id: {
        kind: "youtube#video",
        videoId: "YyxqNMBuNOU",
      },
      snippet: {
        publishedAt: "2021-09-16T00:01:02Z",
        channelId: "UCTGOuh9b_Su2k5xEARHCQQA",
        title: "SONG TEST🎶🎤 - \ufffcSoulmate edition😍💞 #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/YyxqNMBuNOU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/YyxqNMBuNOU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/YyxqNMBuNOU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "JT Casey",
        liveBroadcastContent: "none",
        publishTime: "2021-09-16T00:01:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "lsJrpslQfe5Bi647yGng_y2nLT4",
      id: {
        kind: "youtube#video",
        videoId: "6K0eZLNbIvk",
      },
      snippet: {
        publishedAt: "2023-04-23T21:00:02Z",
        channelId: "UCqiAbH1oUNHMyYsP3I7nwbQ",
        title:
          "#POV you sing a song only Triton’s long lost daughter knows #acting #youtubeshorts #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/6K0eZLNbIvk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/6K0eZLNbIvk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/6K0eZLNbIvk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "CrazyCae",
        liveBroadcastContent: "none",
        publishTime: "2023-04-23T21:00:02Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "j2tYKdkmr3gcpNG8LgWl_P7MrU8",
      id: {
        kind: "youtube#video",
        videoId: "JHza8b5Fqsc",
      },
      snippet: {
        publishedAt: "2023-07-02T17:00:19Z",
        channelId: "UCTVDQk-FBqVmwWtMGuBVqgA",
        title: "AUTOTUNE vs NO AUTOTUNE #shorts",
        description:
          "jain #makeba #netta #toy #suburban #uhoh #billieeilish #lovely #xxxtentacion #michaeljackson #tiktok #music #autotune.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/JHza8b5Fqsc/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/JHza8b5Fqsc/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/JHza8b5Fqsc/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "GoViralMusic",
        liveBroadcastContent: "none",
        publishTime: "2023-07-02T17:00:19Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "OUl0PlHQqeokHu8oXFR45RMRxTM",
      id: {
        kind: "youtube#video",
        videoId: "6QwuHf3FZZk",
      },
      snippet: {
        publishedAt: "2023-06-19T09:26:21Z",
        channelId: "UCa6jSr828mZC44OGG6b5z4w",
        title:
          "honey bee 🐝 #instagram #reels #tamil #trending #troll #kesavkutty #shorts #songs #honey",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/6QwuHf3FZZk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/6QwuHf3FZZk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/6QwuHf3FZZk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "kesav kutty",
        liveBroadcastContent: "none",
        publishTime: "2023-06-19T09:26:21Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "-PxGGK95bWp1T_XFORgFYORSCMQ",
      id: {
        kind: "youtube#video",
        videoId: "ERueD5n_8t0",
      },
      snippet: {
        publishedAt: "2023-05-19T13:35:20Z",
        channelId: "UCzsNLZ9GrGXRjt0QmvWFm2Q",
        title:
          "This Song 💃 Participate in #OttagathaiKattiko only on YouTube Shorts #TrendingOnShorts #Shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ERueD5n_8t0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ERueD5n_8t0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ERueD5n_8t0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Chattambees",
        liveBroadcastContent: "none",
        publishTime: "2023-05-19T13:35:20Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "0Le3GwuID5rap07Y1SheoMFH4-Y",
      id: {
        kind: "youtube#video",
        videoId: "P3rD7pFIBDg",
      },
      snippet: {
        publishedAt: "2022-11-13T02:18:29Z",
        channelId: "UCIOED-ebUKXRUaslb62-x5g",
        title:
          "all my songs in b!o 💖 #original #independent #popmusic #reaction #newsong #singer #shorts #kids",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/P3rD7pFIBDg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/P3rD7pFIBDg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/P3rD7pFIBDg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Jades Goudreault",
        liveBroadcastContent: "none",
        publishTime: "2022-11-13T02:18:29Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "MI-i22C2v0i5cAu0TM_RFev6Cw4",
      id: {
        kind: "youtube#video",
        videoId: "W5B3-u36Tag",
      },
      snippet: {
        publishedAt: "2022-05-13T00:30:28Z",
        channelId: "UCJnGGTaVKui3OAST9yyXxOg",
        title:
          "Did she just accidentally write a hit country song? 😂 #country #music #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/W5B3-u36Tag/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/W5B3-u36Tag/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/W5B3-u36Tag/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Thomas Mac",
        liveBroadcastContent: "none",
        publishTime: "2022-05-13T00:30:28Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "_qJ3_G3zjBIuETAl5Pk0Fx_kr0A",
      id: {
        kind: "youtube#video",
        videoId: "DzhrFC2_xMI",
      },
      snippet: {
        publishedAt: "2023-01-31T04:59:18Z",
        channelId: "UCtwQvkMG2Ksbe2HhB1WJlOg",
        title:
          "His energy and pure talent made our day 💯✨#shorts | kids cover parent&#39;s song!",
        description:
          "shorts Subscribe to Cover Nation for more of the content you love!: http://smarturl.it/SubCoverNation Click That Bell to Turn On ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/DzhrFC2_xMI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/DzhrFC2_xMI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/DzhrFC2_xMI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Cover Nation",
        liveBroadcastContent: "none",
        publishTime: "2023-01-31T04:59:18Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "rdKTeZwDmXvM8Bbce5j7xOFxdg8",
      id: {
        kind: "youtube#video",
        videoId: "MUbf6qsg7l4",
      },
      snippet: {
        publishedAt: "2023-06-08T21:01:45Z",
        channelId: "UCktg2-mQo-QcLJmSYHQoaQw",
        title: "Cool music #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/MUbf6qsg7l4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/MUbf6qsg7l4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/MUbf6qsg7l4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Cray Clips",
        liveBroadcastContent: "none",
        publishTime: "2023-06-08T21:01:45Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "NTA8R1YMh_JpL4O4o06gCl892sQ",
      id: {
        kind: "youtube#video",
        videoId: "liwI54T39_Y",
      },
      snippet: {
        publishedAt: "2023-02-22T19:00:03Z",
        channelId: "UCWQrSQ0wJ3oZshXsZcl_Srg",
        title: "Kaash Paige - Love Songs ❤️",
        description: "Song: Kaash Paige - Love Songs.",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/liwI54T39_Y/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/liwI54T39_Y/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/liwI54T39_Y/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Music Media",
        liveBroadcastContent: "none",
        publishTime: "2023-02-22T19:00:03Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "QW_hBXJWqJrulM42OcIcfkpee34",
      id: {
        kind: "youtube#video",
        videoId: "eC0HvA2aEK4",
      },
      snippet: {
        publishedAt: "2022-10-27T02:26:54Z",
        channelId: "UCOgybRtXVaaJiJhnP0393jA",
        title:
          "#pov You wrote a song to confess your feelings to your boy bff,but u see him with his new gf #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/eC0HvA2aEK4/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/eC0HvA2aEK4/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/eC0HvA2aEK4/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Miuka ",
        liveBroadcastContent: "none",
        publishTime: "2022-10-27T02:26:54Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "brjRSl8UbuquWxCdpn2LWwjeUPs",
      id: {
        kind: "youtube#video",
        videoId: "BihslTz_-EE",
      },
      snippet: {
        publishedAt: "2022-03-13T16:00:03Z",
        channelId: "UC85utsWca6LERMW3ATc2lXg",
        title: "Top 10 Trending Hit Songs",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/BihslTz_-EE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/BihslTz_-EE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/BihslTz_-EE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Max Grabel",
        liveBroadcastContent: "none",
        publishTime: "2022-03-13T16:00:03Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "e6b9bY0ftH9a4SiKjJCrO8mgDjY",
      id: {
        kind: "youtube#video",
        videoId: "LLlsg8g63oQ",
      },
      snippet: {
        publishedAt: "2023-04-27T14:00:25Z",
        channelId: "UCwSaacj6JmPWffsE_3t5Zhw",
        title: "Make a song with these Emojis?? (CHALLENGE)",
        description:
          "Join my channel to get access to exclusive perks!! ⬇️   https://www.youtube.com/channel/UCwSa... Follow me here too!",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/LLlsg8g63oQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/LLlsg8g63oQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/LLlsg8g63oQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Landen Purifoy",
        liveBroadcastContent: "none",
        publishTime: "2023-04-27T14:00:25Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "f3wxwNrYQ4zsr0PJFfB6hkPDPkk",
      id: {
        kind: "youtube#video",
        videoId: "jXvU5HiapSI",
      },
      snippet: {
        publishedAt: "2023-01-28T20:22:23Z",
        channelId: "UCgSZsQtFCXNmxB5irju2AOw",
        title: "Do you need a hug? Lonely Sad Songs Challenge",
        description:
          "shorts #hiphop #DJ #music #dancemusic #challange #artist #artistlive #live #liveartist #songs #song #djing #djlive #singer #love ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/jXvU5HiapSI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/jXvU5HiapSI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/jXvU5HiapSI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Arc North Daily",
        liveBroadcastContent: "none",
        publishTime: "2023-01-28T20:22:23Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Q2O0LM4lj2ylA9NFqyV4ljvQ86s",
      id: {
        kind: "youtube#video",
        videoId: "t2dJdEaNetM",
      },
      snippet: {
        publishedAt: "2023-05-08T21:51:21Z",
        channelId: "UCLxZ5uCxBfJo9NueRX4ZcwA",
        title:
          "The Biggest Song Each Year The Past Decade #shorts #hits #music",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/t2dJdEaNetM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/t2dJdEaNetM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/t2dJdEaNetM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Jarred Jermaine",
        liveBroadcastContent: "none",
        publishTime: "2023-05-08T21:51:21Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "6yvfg7I_zLsb2FPhtzq_zSMSGVs",
      id: {
        kind: "youtube#video",
        videoId: "Nq_XxcT6R3I",
      },
      snippet: {
        publishedAt: "2023-04-20T03:30:07Z",
        channelId: "UC4XECvPuDbeCQzjnbGVCR8Q",
        title: "Respect 😍😍💯🔥🔥#shorts",
        description:
          "respect shorts #shorts respect shorts respect reels respect song respect video respect status respect natok respect girls ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Nq_XxcT6R3I/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Nq_XxcT6R3I/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Nq_XxcT6R3I/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Mohammed Ayan",
        liveBroadcastContent: "none",
        publishTime: "2023-04-20T03:30:07Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "hIUYKIV-YzsTFwL7MuKJ-LqE-hI",
      id: {
        kind: "youtube#video",
        videoId: "LgMODve4nD0",
      },
      snippet: {
        publishedAt: "2022-10-31T23:42:09Z",
        channelId: "UCGa9YJJiR-Jec5y10GQxEPg",
        title: "Do you recognize the song made in Minecraft? 🤔 #Shorts",
        description:
          "Do you recognize the song made in Minecraft? #shorts30 ▻Subscribe! https://bit.ly/2N6xMG5 ▻Discord: https://bit.ly/2ObBw9P ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/LgMODve4nD0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/LgMODve4nD0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/LgMODve4nD0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Twi Shorts",
        liveBroadcastContent: "none",
        publishTime: "2022-10-31T23:42:09Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Wf0jITDtYsZj_F0XG5axby-ib5I",
      id: {
        kind: "youtube#video",
        videoId: "NJCLuJ0YsfM",
      },
      snippet: {
        publishedAt: "2023-06-05T01:05:00Z",
        channelId: "UCGHyKYSh2m0z_7pV9gqoxrA",
        title: "Rashmika Mandanna React&#39;s 😍😍 #shorts #dance #song",
        description:
          "Rashmika Mandanna React's #shorts #dance #song respect shorts #shorts​ respect shorts tiktok Respect reels respect song ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/NJCLuJ0YsfM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/NJCLuJ0YsfM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/NJCLuJ0YsfM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Rashmika Mandanna",
        liveBroadcastContent: "none",
        publishTime: "2023-06-05T01:05:00Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "sFqd99f6s5p0cXjMQOlgjWpES2M",
      id: {
        kind: "youtube#video",
        videoId: "yZL_C-Kcxf0",
      },
      snippet: {
        publishedAt: "2023-02-12T16:49:58Z",
        channelId: "UCgSZsQtFCXNmxB5irju2AOw",
        title: "Try not to sing! Most streamed songs of all time",
        description:
          "shorts #hiphop #DJ #music #dancemusic #challange #artist #artistlive #live #liveartist #songs #song #djing #djlive #singer #love ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/yZL_C-Kcxf0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/yZL_C-Kcxf0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/yZL_C-Kcxf0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Arc North Daily",
        liveBroadcastContent: "none",
        publishTime: "2023-02-12T16:49:58Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "bac-RTpZTbRgUS4ub-xmZcMMAIU",
      id: {
        kind: "youtube#video",
        videoId: "dbiPk0tpjz8",
      },
      snippet: {
        publishedAt: "2023-05-21T09:00:25Z",
        channelId: "UCd0tJNkOLGCx1tMErPFf-Jw",
        title:
          "TOP 20 TRENDING Youtube Shorts Songs 2023 | Trending Song 2023 (Part 2)",
        description:
          "Top 20 trendy youtube shorts songs 2023 part 2. Trending Music 2023 on youtube shorts. Trending song recommendations on ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/dbiPk0tpjz8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/dbiPk0tpjz8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/dbiPk0tpjz8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "TOP MUSIC",
        liveBroadcastContent: "none",
        publishTime: "2023-05-21T09:00:25Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "8gfSHEnLuQcHOcd5LD_3i0LW5ZE",
      id: {
        kind: "youtube#video",
        videoId: "6VhX66pXWjE",
      },
      snippet: {
        publishedAt: "2022-11-21T01:24:28Z",
        channelId: "UCC_yeJ7B8-mqpDTq3Ru9PGw",
        title:
          "Gym workout song💪 english workout songs gym #video  motivational songs #short #shorts# workout#gym",
        description:
          "Gym workout song english workout songs gym motivational songs workout songs #short #shorts #gym #healthtips #instagram ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/6VhX66pXWjE/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/6VhX66pXWjE/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/6VhX66pXWjE/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "ʜᴏᴛ ɢʏᴍ ʙᴏʏ Yt",
        liveBroadcastContent: "none",
        publishTime: "2022-11-21T01:24:28Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "i86f1PU0Ehy6g-4WdG7wB9J-aeM",
      id: {
        kind: "youtube#video",
        videoId: "vhodXy0A-Es",
      },
      snippet: {
        publishedAt: "2022-12-30T15:27:03Z",
        channelId: "UCM_D1Gw5StkOffHbSId-1Rw",
        title: "Top TikTok Songs of 2022",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/vhodXy0A-Es/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/vhodXy0A-Es/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/vhodXy0A-Es/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Levent Geiger",
        liveBroadcastContent: "none",
        publishTime: "2022-12-30T15:27:03Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "XzVN8q8df51IhL28TYKjldryyXY",
      id: {
        kind: "youtube#video",
        videoId: "-I33HUAGUWQ",
      },
      snippet: {
        publishedAt: "2022-08-17T23:49:18Z",
        channelId: "UCjlddd4BeK028Av428tFDkw",
        title: "Shake shake shake #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/-I33HUAGUWQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/-I33HUAGUWQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/-I33HUAGUWQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Grey’s World",
        liveBroadcastContent: "none",
        publishTime: "2022-08-17T23:49:18Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "SxySk69IjlQgRJGG3XVDhVYIss8",
      id: {
        kind: "youtube#video",
        videoId: "koDcfUcZLbg",
      },
      snippet: {
        publishedAt: "2023-04-25T05:45:00Z",
        channelId: "UCDi0eYKj4VH_m7VBzeeBMBw",
        title:
          "Afreen Afreen - Cover by Sayali Sonule | #shorts | Squarecut Music",
        description:
          "Cover of the song Afreen Afreen by Rahat Fateh Ali Khan. Follow us on : Instagram - https://instagram.com/squarecutmusic?",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/koDcfUcZLbg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/koDcfUcZLbg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/koDcfUcZLbg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "SquareCut Music",
        liveBroadcastContent: "none",
        publishTime: "2023-04-25T05:45:00Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "Jl92Os3w5R600MrAeCBZTYrM-Sw",
      id: {
        kind: "youtube#video",
        videoId: "SavotSPhvTo",
      },
      snippet: {
        publishedAt: "2022-06-13T07:45:00Z",
        channelId: "UCrV2Ym3Z94zOZ40psHvCikA",
        title: "You sing you lose! No dacing or sining in your head allowed",
        description:
          "shorts #bassboosted #carbass #bassboostedsong #carbassmusic #bassboostedmusic #bassboostedsongs #bassboosted2022 ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/SavotSPhvTo/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/SavotSPhvTo/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/SavotSPhvTo/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "BLACKMAGIC",
        liveBroadcastContent: "none",
        publishTime: "2022-06-13T07:45:00Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "EjcN0gvw_3DxejikdDFSrEleEPY",
      id: {
        kind: "youtube#video",
        videoId: "8KzoJz3A5AM",
      },
      snippet: {
        publishedAt: "2023-05-05T19:15:00Z",
        channelId: "UCWBWgCD4oAqT3hUeq40SCUw",
        title: "The Evolution of Music",
        description:
          "Join the Hat Gang! https://www.youtube.com/channel/UCWBWgCD4oAqT3hUeq40SCUw/join Subscribe and you'll have good ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8KzoJz3A5AM/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/8KzoJz3A5AM/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/8KzoJz3A5AM/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Sambucha",
        liveBroadcastContent: "none",
        publishTime: "2023-05-05T19:15:00Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "41iLog39_U-yYxOlP17cboQYjfU",
      id: {
        kind: "youtube#video",
        videoId: "Qa3aUcc9PEs",
      },
      snippet: {
        publishedAt: "2022-09-30T18:01:27Z",
        channelId: "UCqww9ApXdeuudYgdtMwt8uA",
        title:
          "#pov she preforms her new song in France #shorts #tiktok #acting",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Qa3aUcc9PEs/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Qa3aUcc9PEs/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Qa3aUcc9PEs/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Valerie Lepelch",
        liveBroadcastContent: "none",
        publishTime: "2022-09-30T18:01:27Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "EPoU2I_cYDA_1e-tcU6maVfpY0c",
      id: {
        kind: "youtube#video",
        videoId: "QAlE09wshm8",
      },
      snippet: {
        publishedAt: "2022-11-21T22:42:26Z",
        channelId: "UCXtCobcQRbIk-_sPSJUXzmQ",
        title:
          "Sia’s Chandelier music video was INSANE😂  #sia #chandelier #maddieziegler #dancemoms",
        description:
          "Click HERE to subscribe: https://bit.ly/3Pcz9Or Instagram: https://www.instagram.com/c.b.3/ Tik Tok: ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/QAlE09wshm8/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/QAlE09wshm8/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/QAlE09wshm8/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Charles Brockman III (TheOnlyCB3)",
        liveBroadcastContent: "none",
        publishTime: "2022-11-21T22:42:26Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "iHcyv7Svqr_2qXejzHKgInGqlP8",
      id: {
        kind: "youtube#video",
        videoId: "aokvZmFj5EY",
      },
      snippet: {
        publishedAt: "2021-10-22T18:44:34Z",
        channelId: "UCrK3QhysEdDe96_e2ewIOuA",
        title:
          "this is wayyyy harder than it looks😬 the last one tho...😂 #shorts",
        description:
          "this is wayyy harder than it looks   that last one tho...   #shorts #country #challenge #siblings New song dropping 11/4   Presave ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/aokvZmFj5EY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/aokvZmFj5EY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/aokvZmFj5EY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "The Band McMillan",
        liveBroadcastContent: "none",
        publishTime: "2021-10-22T18:44:34Z",
      },
    },
    {
      kind: "youtube#searchResult",
      etag: "skyt5gvlNbSNrkEyPz6Aagxs7v4",
      id: {
        kind: "youtube#video",
        videoId: "aAM18Qdzyfw",
      },
      snippet: {
        publishedAt: "2023-03-30T22:11:32Z",
        channelId: "UCBhNf3uDB4pFuww29O_wAJQ",
        title:
          "#pov you got tired of your sister (🎤) stealing your songs so you expose her at a show #shorts",
        description: "",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/aAM18Qdzyfw/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/aAM18Qdzyfw/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/aAM18Qdzyfw/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
        channelTitle: "Jezelle Catherine",
        liveBroadcastContent: "none",
        publishTime: "2023-03-30T22:11:32Z",
      },
    },
  ],
};
export const getShorts = async (tag: string) => {
  const youtubeAPI = process.env.NEXT_PUBLIC_YOUTUBE_API;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=30&q=#${tag}#shorts&type=video&videoDuration=short&key=${youtubeAPI}`;
  console.log(url);
  try {
    //await postVideos(ExampleData.items, "Music");
    return "response";
  } catch (error) {
    console.log("ERROR", error);
  }
};
