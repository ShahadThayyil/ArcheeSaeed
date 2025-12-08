import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // For smooth popup
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// --- TEXTURE URLS (You can replace these with local assets) ---
const WALL_TEXTURE_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExQWFhUXGBoYGBgYGBodGBobGBgYFhgXGB4aHigjGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAKoBKQMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAABAgMABAf/xAA9EAABAwICBwUGBQMFAAMAAAABAAIRAyExQRJRYXGBkaEEE7HB0SIyQlLh8GJygpLxFEPSIzNTosJj4vL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8lZ2ke64SN8Ebig7uzhpfuB/8oEONtEnPD1S6LiY0b7BfogpoRcaQ3mfJPbMHnHkuctgXDhvBTiiflN9iB3OGHmPRZtUDI8x6KYc0YjomApm4JB/KSgo6oyPdOFr38EvfBpsCOI9FqFN8+zAzz8gVRz3Ns5uOtgv0lAvezr3Wv0T0aNMzOluDh6JdODpaAA1loA34I1X03XiTsB8kD6FPW4bnAeSL6dMDXvPoFFtRhGERjIMrMrNB+KMjBvsQB9ZuAbF8iB5Ih9OPd6n1Vv6wiI0sb2OF8OiY9sZiC46wQglTe0zGqwJ64pg0HFrLbT/AJJzWpE4CBlou6ACEO/pfJP6fogm8gYeydYJPOSbKhYCBpOnZI1a4QHaWmA0aNsNGT0B5qemGmC22YLPogozs1MgXI26TfCFCvRg5m1iCPS6t31PJgP6Poma1zhamdhDLeH3CDkY0TJ0p3/RN3wwvxI/xXYaNbNjv2D0SPpO+QwfwegxQc5e02vzHomDGW979w/xurt7K4YUo2aM+VkGdld8hj8vTCyCMUwcDzHgAnGjkSbZQPJFwIkaMkZFkxgcwmD4j2OGgB5IELWnJ3Mf4rNotifa5j0VAGxJB/abdFPQdkwgH8MTtuEGNJp+bm3/ABug7szBHvcx5BNDhEsP7R5D7lB7i34SAcZZ9EAAaMyeI9FN+jjDjxH+KuaE3Db/AJfolGkL6BH6fogiHNtE8SPJULwg1hfrI2i3NI+iGkRAnKUDiEHN2IAISRcSdQxQEBHR3oaevFNpb+aBAw6wsWZEjhdK2qcHEgDMCP5Kp3jNU73HyQZpjB3KR6JQDrCxeMh1nzVG1Kfy316RCCrezu2bPuEr2xY2I4+CTvz81t8+SArttr1lx4ZoHFRw92L5mVVld+y2on0TONLGBvLz4SiHUyLAcC7zKCR7a75Qds/RMyoQBZvO/gneWAgRHE5HfKGnSF4/7FBgATJI4TO42QewYgttvwtMYIv7oiRb9WOy86kgrMyYMNbvVBSGR7wH7r9E7ZiZAGeJ8lEaNjojmVZtSDDQY4W3SPFAWUyfcIIE42j1WOkM2zqnzhDuhNnP4aPhCY6MXc/jo/4oJVqhLSHACLzjgdymXgfEORhdArt28woPDdfUcrhBal2d7my3RInWfRTPZ6jbAAzOBgfd1OgyD7NUszxF10s7O8me9JzsRCCYoVPlb+76Krg4SDE7Jd5J3UX5VL/lbC5KVPSxedIWy8IQNV05wb9ifJRNR+OiOaqx7Z9pznAHCzfLD72IsrsvjjYAxGzC+9BMVTsbzjoCmMfNG4Hpgq1O7di0DbpIaFIf/soEbRDvjB2OB9fNKaFrEYxBkbsk7qjW3AgZ30p4ZJ6dQOuHGThcDLDxQTfReB7zeH8I06bhmOoVXMbBl28aQ8lHtERpBxt+IX2a0GNN17N+88FtJ2BiNn8JBVbhJH6lOp2gAjE8fuEBqbLbh4yTKnSdr13lPpCZvGozCFQt/CP1T4IBUpmZBSCZunZ2gC1lnPnAdEClgKXuNqOkVpKAGicxbwVGUycp5JANZHX7CBpTmOqClPdacFQtZqPCQoupk/ECdoN/vamayPjHIoLt7OwD3XHaQf4T9zUI0QDGQtguXQIvLSNVx5J2U9LAN5n0QUpUCDBpzGxGr2WfdYJm9ojqEG0qmEN2SfC1lv6epN4HkgLaFUWFhvEeKqOxOjBhjPSbN9UrmNTU4E/lsiyq84HRymL+KDqZ2UtNmC4vOj6oO7NF3MEZyAQoGs4WJB3fWFm9oEY8xbnKDod2WlkBPJJT7NpYsBjUQONjis1zDeXD9Ajh7V0r3tyqjdoOHhMoM+joz7EjGTJI3rf0TjB0LSJlww1xKTHB7dYMOxzFx9yrNe84lo5k8rIC7sTRcNDtkT0CX/TEA0r6tEDqi5pB95s/lPqk0Jvp3/LbxQUdQa4Toeza1sb3iZwKn/SN/wCOeA+iakwSRpi2yeONtyYgYF3Js+Lggm2gGw7QgX23kZAnaqvrz8Jdr9iDzIkrUe0lo0SAYJvJEyemKd3bTk0cyPJBLTZPuGfyeUdFtGm0mWRf5ZxvkNqd9d5vABBwk7RqhY1CSPabMXEH6+CAHRddoJGwRwySGjONKwwsJwzjJO9zgMc8gZG26ZtR8TpNvsnUNaBWBvw09mXmUrnM/wCLHPRVHuqD5d8fVAOe7EMjVB9UEqbAMGc9HzKbQNyAcrgg872Wd2cmfaAj8JP/AKUatIkhpdybq3u2oK+7fRmN3S5und2yQQGu5YasSpuoNxDzh8o9Vn9m0b6RI/L/APZAtZlTIPvt+qB7PUvjGPvDO97qp7PIs8jhyzCR9Ej4icsB6oIVOxknAT+YdbpWsIxOw71aq3a7dAHqucuvYffBBtIg696fR2DqtpyN2pJoj5ndECsqN1dTfZsTlo27hjzURSnI8ig1gwwPFB0hzPlP7vUIOLJwfwcOWC54brnh9yrCw93m31CB2V2j4XEbXC3/AFKzO1X9k6N9/OyBqgXAEbWj0wxTiqTgNhhscLBBV9Yxdx4QB0VG9o0hAd7WouaOpGa5D2TRu5sbS0lO17Gn2fe1aBnwQWp02HFuiRMjSJGUXRdQbqI3O+iiyppH3QdkAeI6p2UWA+22DtB8YQO1jMC1x/V9EadCn8jxjfT+iD2GoNGkwkC/stt4KX9A8e81/IoL9wzU/wDc0+SNLs9OcHEz8wnwC5XdlLbw7iCm/ppwa8nXcNCDtb2dgn3v3D0SPYzLSB/MPRctKlTEgwTtnzVGtZabNn8Ub0DDR1uPGCg4DLSB1SCi40fhgnKAZ6A3UWsq29k3w9kX6bEClo0SZc07dedoTU6onO20X32XQ0OxLHaUfJblEIOrQRpNjaWGeECOYKCdRrThP7vogHAWLiNlvRV0y73aUjCRTiY4YrEOHvNNtdP6Sgi0tGBIG8eYQIm+lcbQulnbGARIF8NG4U672uNgCY+UnlAQJ3o+KSNhuIzG1dQZScA5ryJxvjv1FcLXuBBDZg4BgGzMDXgt3mJ7twHADbAm3BB2uaMnkn8x8FECmTDiAYydu2whR7UwA6QgzNwJO7Mqsip8LuSBGsY0zLiT+I+SWo9syAT+p3mUD2QfC1xI2Qfvcl06YxaZ2g9SUANZglp0t4fkUQ5htL5/MPRMztlOALgjYpu7QcZMcEE30QMHHHAO8hgiA3N2+TdPT7Qb6TSZAyBnE4jBZ9fUCP0m3RAC6ngXSNh+qiaQ+HD8yrU7STIgnc2SoTGR4tPog2iQbOiRmUZd/wAjeaAq7xsgQl7zaeQQZ7yMvv0VGlxzbxJWbEQXiDsPSc0neNBiXb4+qCjTeXaP3w2pi6Bb2uJ+ilLIuXnbDR5lUp1mAfETqMX43hAW1XbG8/IJqdOcHt4zKDazDYtcOI/xTkAQdE2zDh/igDeyu+YAYTcjcYCJpXg1QIn5o8EKlYSRLidoBgHKQbqje6IuHTqGCAd0cnBw1380x7M51tJox1lak3JriL3kCPXgrVWR/cP7RzscUHK6m8Z8iY+gWdRfOI3yU5a4/ESNehfodqcExdzv2D/JAjaUH3mz+ryaqsLjI0mxEiSY1WslHZhH+7bUW365KMtkGdhkX3CPNBXRBuSydn8INcRID2xrkx4JHVaet/IfYQ/05mTo5DE8dW7qgsQ7Mt4E+im9ul8TeZ5YJdKmJgvGyG7dtkhLHTD3A/lbhmN/3KDN7OJ99s5e9/irCkP+Rg3H6Ko7K0tBJJPD74Is7HSOb5/SPVBJ1L53hpym8jI2yWFMZPB3JXdjgwSC3KMeKLKTQJl+oxoxyKDOp2sWmL3dHkqNqGBD+rvRI6iLOE4XBAGWwrUQIn2t/s+EW4oH75xznXcx1WNF8f24O0nwCVgZgGkD85SB+i7R0i0fLIMHfCCtQuGIaZzBM24KPevyDRtuql0e9LsxBH+JUz2mmcGO1Tpjyagp3jzYkHmOhWDycS0bLoOc05k8R6Leyc3fuHm1A+OJHCUHnRGM7h6z4qVSjqc6+ZvwsJnFZrGg30jxA/8AJhAZJzaOOPopMrEGARG4poYT8YjaDOyzQRvTVOztcC4VA3Y65wnL0QCo+rhIgYTF+iWpVfqbwMqbzo/HO6Eja41uOwmB0CAtrOm7b9FWdime0txDY4k+KH9YNQ6oIMGxO6tkGt4NnxwRkqjarxZvsjfZAg7RGLL7R5LMrDUDwTy7Mg8QU/tG4AO8gdTbqgm6oLHuxxHh9U39RTzYJ3c9yq2o82j/ALDwTOa8YjrZAW9qoRZgjeesfVRGPuujInIaphF1Mi4DeBmOnVOA92Lhuk+lkHPWpnEzGexCk+MJjYXDwK7mUnkEBzYNrk24aKD6dQfGODjyuMUHPptxGe0217Y3oNMmzjzK6nUKgGlI5iT1U3ipkQdxEfVArqbjhp8JjmFr/KBtLfUJmUaxycNpdHK6zqVfCTvLkGZpTBpAjX3f8Jqg1U3DXDCJ3QEr6lYYEcXfcp6b62Mgz+LDgUCFk4UX65h3O+SZtambFgB/LzwCBrVicYvrGvK6Dq9TB07y4Rbgg5m0T+Pr5qjKRxIqHYJB6Kh7Q+CDBt8w8/JOKjziCTsIQIdHHungDEkkpQxrrhp5uVQ+odm9w3YIllaZlsRr+iBab2j4HHeCfFMXux0HRrLcOiQ1KgyH7hzgDBOzvDnTzxcfRAr6bpB7px2aNjOcBGpTcR/s6I/IRzUmUnjUNkkbNSamDOLQeJ8kGFD8Dv2lEst/tk7wemSdocCD3reGlxy3Khe8G72neDfjJ8EHHUeGmSyN7TH3ZYsLgfZiNQgcl3GpUyc0byY3CyhUZBnSaeJtP6UEj2dzhApuI3GEvcaPvMPEOVtGbaW73vNBrKmZA2OMnnlwQQq0dL3WHVYFL3BzpuB/LbjZdPdVD8bY2uPS33CD+zvAkOadxM9QggHxbuwduik7wCzmCN23XiuoB4Bl2lq9o22XUK9F13GBnjf6oI1NAQRfXYiPoj/UD5RyT02uI0SQBlj5ZI9x+NvJ3oggCdadlMHEnd9hI4DPom0mahxxHNA4pM1uHELaAycUss1NHD7hOHNtLRwF/wCEGLfxD7y/lGmZ+I8v4RNMZNnVYrGmPiaW7pHNBUbXxubHms4N/wCSN4slpto4EjieiNSiwEFt2jE4idW5AHgA2d0HSCmAaRd5n8tvFZtNpwZxANtwAuiwg/ATvBQJoAG7jB1Y/e5VFGn+P9zUB2UyZpmTkA4hJU7MIksdqzjkgeoBrcN+XJK2qzAkkib2hRqU2jFrhO+/VM80iJDTOZuJ4ZFBQVWfiPER0Cg6vf2ZA4HkiNA4NPMqlKqwCHNAO6SgYEEzLpzMNPLUlqFut0znCwrtafdBG1v2MFTvaLvgAIOTYEbRGO1BzhsmCRrvtGO9XZTMTpGNVo84R70QWiCNUD0Sio539mf0D0QBwBwJGyQd8CxWNIxZxga8N+xbv2yWmiTwMjdsxUyWg+1TvqM23IGDW5kndHO/3ZYGPitl7v3KdoaRApknETI33lUbGBoxtGW25MhArdHNx5j0S1jTyc6eiZtRp+Bv7UadamMmDXDfMhBztLcCTvlO58YHniqF9M4d2LH4RfDZjjzKmdGCQ3f7NueSCha0wdIzvFuSwLIxceI9L80r+6Nxog5iDHCVB1AXOiYGoGcc9SC2kJMvMbAJ6rabTbSd09Ef6xnygxrb4xig40zctGvCECPczIunepsqiMTxNhwVW1KYcZaG2zz3SVnun2ms0hOIbY8ggl3k4yRsMR0UarybaRIwieS7e9kwaEg6pB4bVFtbQs6mLa236oINfGBI4pu/2+CuKubaQcNegCJ8kf6r/wCEckHP3xyM5XRBOJjcmAp/FpdIG37KRrWfj4EDxBQWZOQB5INqvGEg9EopNyc4DgSqGm3EOO3C6BWveLTG4ppeBME7ZBT6AizjOoxHFamBm79tuplAhDnZDmFVlKoR7zRsc6PBRc8AxpWy+4RAbYl9twJ4akBcyoDGkODjHRB5qC5J1Wcmc1kXknIyI5Fs9U+hTx03TvEcoQI11U+7pfuPqq0atWMZ3uHSSpsuPac6J2DDgUwo0ybucBwlB1Co4+8AN5EzwQp1Hh3siNpIg7Jz3KGi0AhridUt+qi6MnO3QB5oO1wOI0Qcw0wOgEcNqXQdgHt3SfMLmYG/E9w3NCbRbPvvjLDrZBZlBx1cwUo7O+SREjPSCkXQRLjo7hKq6k0iRUfb8P8ACAGvVbs26Sd1av7wuIvDtW/NTlnzO46MnaLdErYn/ctsEnnkgr/WVYxIOUOx3CVm9oqvBBeBsdJ8FNzwMHnRzECeGrgsNE3puM56X83QFwqjAtjYbdQiaz4923MIOFruIO4ABNRbIvVHTzzQFveOvDTlBcovc4i4A2aSdwMwKjTuaDzCZzGYnSnZHSb9UEqNOr8LJ4gZJ31aosdIDaSAD4ckxObKj4yBvwXOXOIu4mMibxnFggu2rUblpDGRFp6qre0VHauLx/C5A0D4z97ig1jM3nHCAgo5r5nRbO8dUdNxMEtG8kzyCIgYVCBl7IJ44IVhTImXkiJmL8hZBtF5j2m75sPPopua9gMFrm/hm067WCV7WRYunL2h6XVKIYLlzp3gfUIItc7LqVp1loPHxAhM805gSdxA5ziUlXu8QDt9rqgzqhBix42Td4flb+4KTDTNtEjc71Tf07NT/wBzf8UE/wBM+abvxnTbbYet0lJxFrhV0amMx+oA+KBS7UzoeiLS0e8wzx+wniprB/UPVLL8CC62BNvQoGY9gv8AfimNamfhG8AygKZ+UdEWaTTaZ1gjyKB2dtAwa39l/wCMU5rg3LG79D7AUT2h51mNZRPbKhtLo2+SCgIxFKdui4x1VGPn+w136HeSi2u/CXnVLrJX0XYz/wBvqg6HVCTHcGREgMdOzK3FLLYANPR3sdPE60jdNwA0y2MNJ0DdZKNNpuZys4+aCwfTGLQd4cncaboinuIa7RPBQ9oXBvv9JQPaH6nQcboKPLPk5NIWYxh/tuncUorESCxxE/eBkHch/UE2Dam4mRwk+aAVaYH9pw3g+ao1hF+7cDuP2FN2m0+68bDEIdy7aOIt1QWa0n+z/wBY8cUS7EOpjg2DsmFzf6mo8I9VcCrGoatIT4oC3tAFu7A3sHmmdUH/ABt/alDXnX++PApHUnNNieLhHOUFW0g4aQpTHyjXntQDJJ/0Z1w1IaLjfSH7h6oOfUwJ0owvhsQVNSLd1w0eazcP9oxrLT1U29oeBgeY655JO9qGZnZJ8kHQ32TOhB/LbqFndrkyWB23Q25rmHani3tT+b6ou7S84kjZMDxQWdWJ92mLZaJWd2jXSAm0hpknITAK5Khc6DfmPVIxrtR5i6C7g2TLYm4mfuExhswL7Qf4hHvnRcHpPjdK1zotM7SI6IM6oSD7FtejgsKjThTn9Pok70zBHhG3wUyTqjiEFariRBZAH4fNClXcABEapaDxupEfc3upk7L8EHYe0PI92d1MeMJe8PyH9q5C50T5p4d9uQI5yZpccIQNSPhaRrMz0KHearbvqSgY6Q1LaTsiEGz8RnYbeEJw5urqfMoAJjHmsJ1hGG5Sd5WI1HkgqJAv99UBXOQE7R9VANGbjzVGvAseZlA8OOJAujh7zjOwfVD2YzHEoENxknX7XqgvSbpe66DnIg8I9Vn0Yvpb7fVcrnNmQXD9X0TCp+Jx4jyCCrY1nkPVOWjW4TsHquc1m6+ZPlCAqD7J9UHSWkix6fW6RpPzKLX3xI3H1VHub8xnegqWv123JDWIj0U+8mwc7nKwLdh4kdAUDmsdfRbvnaxySBzdQ4kxzlMarcmtHEx4oM97tkI97I/EOXHlkh3jc78THjPVA1GHBoHP1QIK79h4fVUFV5GIjctpt+Xq71WFRo+EdTyLphBg04zfclLXa0xrU5wHWOEIurM+hcY8UGdSd9hAUXnMJX1m6JA0RbbPisK7Ts3E+qAuYWxMHdipl+QPNE1W7J234XWdWBwDf2oLU2uzcOSk9p1zdIXaxG8eqYVxqby9ECHHFM2o7Ijki1wyAtrEpHVBqA4AeSAaDta3d7+iRxGvqg1zRkDv0vIoKsvaclu7PzdFI1Rk0DdPqj3v3J9UBnYiNI4aUbVtIqbkFIeDEFOHP1O5fRQJukm6Dt7moRIDjw+5Uu7fqKkPvmmJ8UFBScDET1RqUHxdjuRSNNvvaiw+2EDdy6JLXDgQnbSdgWutqafJKTc8VnYhBix2YdG4oHcZ3KVSq6Tc8zrUhUOs460He2vsdyKBq1Rb/U/7LhYb8CrO92c5QdNPtGlZwceF+KWo8jAEDCdGMcipioYNzzRFQwTJmNaCx0jaHXtgb9E7XOi4dyK4tM6z9kIl5k3P2EFHdqcDHtZ2I8kG9qnHw6JKbjBulcboOinWBsJncfFN3jxiXdVyuF1Sjigo11XLTA2SEzKlQi+kd8z1TUsBxU6xugaH63c580HuePmOu5SNxhFpugYYYOG76FS9rH2lZrjGOawPj6oIEmfaGGtB+wFXqYHcoOOPBBm4pnzmD4jmubSM45qrXm9yga+1YkC4JWmylmgq6pORScEs3TygIByBW0HaillaUH//2Q=="; // Rough Plaster
const FLOOR_TEXTURE_URL = "data:image/jpeg;base64,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"; // Concrete

const Projects = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [zoomedProject, setZoomedProject] = useState(null); // For the Pop-up
  const navigate = useNavigate();

  // --- HELPER: CREATE ENDING TEXT TEXTURE ---
  const createEndText = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 1024;
    canvas.height = 512;
    
    ctx.fillStyle = "rgba(0,0,0,0)"; // Transparent
    ctx.clearRect(0, 0, 1024, 512);
    
    ctx.font = "bold 200px Playfair Display";
    ctx.textAlign = "center";
    ctx.fillStyle = "#BC4B32";
    ctx.fillText("FIN.", 512, 250);
    
    ctx.font = "italic 60px Arial";
    ctx.fillStyle = "#333";
    ctx.fillText("Thanks for visiting", 512, 350);

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  };

  useEffect(() => {
    // 1. SCENE CONFIG
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#EBE9E4"); 
    scene.fog = new THREE.Fog("#EBE9E4", 10, 50);

    // 2. CAMERA RIG
    const cameraGroup = new THREE.Group();
    scene.add(cameraGroup);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.7, 5);
    cameraGroup.add(camera);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvasRef.current, 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. LOAD TEXTURES
    const texLoader = new THREE.TextureLoader();
    
    // Wall Texture
    const wallTex = texLoader.load(WALL_TEXTURE_URL);
    wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
    wallTex.repeat.set(4, 1);

    // Floor Texture
    const floorTex = texLoader.load(FLOOR_TEXTURE_URL);
    floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
    floorTex.repeat.set(4, 20);

    const wallMaterial = new THREE.MeshStandardMaterial({ 
        map: wallTex,
        color: "#F0F0F0", 
        roughness: 1,
        bumpMap: wallTex,
        bumpScale: 0.02
    });

    const floorMaterial = new THREE.MeshStandardMaterial({ 
        map: floorTex,
        color: "#Dcdcdc", 
        roughness: 0.6,
        metalness: 0.1,
        bumpMap: floorTex,
        bumpScale: 0.05
    });

    // 5. ARCHITECTURE
    // Floor
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 400), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -150);
    floor.receiveShadow = true;
    scene.add(floor);

    // Ceiling
    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(30, 400), new THREE.MeshStandardMaterial({ color: "#F8F7F5" }));
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 8, -150);
    scene.add(ceiling);

    // Side Walls
    const createWall = (x) => {
        const wall = new THREE.Mesh(new THREE.BoxGeometry(1, 12, 400), wallMaterial);
        wall.position.set(x, 5, -150);
        wall.receiveShadow = true;
        wall.castShadow = true;
        scene.add(wall);
    };
    createWall(-7);
    createWall(7);

    // Pillars (For Parallax)
    const pillarGeo = new THREE.BoxGeometry(1.5, 12, 1.5);
    const pillarMat = new THREE.MeshStandardMaterial({ color: "#E0E0E0", roughness: 0.8 });
    for (let i = 0; i < 25; i++) {
        const z = -i * 20 + 5;
        const pLeft = new THREE.Mesh(pillarGeo, pillarMat);
        pLeft.position.set(-6.5, 5, z);
        pLeft.castShadow = true;
        pLeft.receiveShadow = true;
        scene.add(pLeft);

        const pRight = new THREE.Mesh(pillarGeo, pillarMat);
        pRight.position.set(6.5, 5, z);
        pRight.castShadow = true;
        pRight.receiveShadow = true;
        scene.add(pRight);
    }

    // 6. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Warm Sun from end of tunnel
    const sunLight = new THREE.DirectionalLight(0xFFEEDD, 1.2);
    sunLight.position.set(0, 5, 50);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // 7. FRAMES
    const FRAME_SPACING = 25;
    const frames = [];

    projects.forEach((project, i) => {
        const group = new THREE.Group();
        const isLeft = i % 2 === 0;
        
        const x = isLeft ? -5.9 : 5.9;
        const z = -i * FRAME_SPACING - 15;
        
        group.position.set(x, 2.5, z);
        group.rotation.y = isLeft ? Math.PI / 2 : -Math.PI / 2;

        // Frame Border
        const frameMesh = new THREE.Mesh(
            new THREE.BoxGeometry(4.4, 3.4, 0.15),
            new THREE.MeshStandardMaterial({ color: "#1A1A1A", roughness: 0.2 })
        );
        frameMesh.castShadow = true;
        group.add(frameMesh);

        // Image
        const tex = texLoader.load(project.image);
        tex.colorSpace = THREE.SRGBColorSpace;
        const imgMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 3),
            new THREE.MeshBasicMaterial({ map: tex }) 
        );
        imgMesh.position.z = 0.08;
        imgMesh.userData = { id: project.id, index: i }; // Clickable
        group.add(imgMesh);

        // Spotlight for painting
        const spot = new THREE.SpotLight(0xffaa00, 10, 10, 0.8, 0.5, 1);
        spot.position.set(0, 3, 3);
        spot.target = imgMesh;
        group.add(spot);

        // Store references for animation
        frames.push({ group, frameMesh, imgMesh, spot, z, isLeft, project, index: i });
        scene.add(group);
    });

    // 8. CINEMATIC ENDING TEXT
    const endTexture = createEndText();
    const endPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 5),
        new THREE.MeshBasicMaterial({ map: endTexture, transparent: true })
    );
    const endZ = -(projects.length * FRAME_SPACING) - 20;
    endPlane.position.set(0, 2, endZ);
    scene.add(endPlane);

    // End Light
    const endSpot = new THREE.SpotLight(0xBC4B32, 10, 20, 0.5, 1, 1);
    endSpot.position.set(0, 8, endZ + 5);
    endSpot.target = endPlane;
    scene.add(endSpot);


    // 9. ANIMATION LOOP
    const totalDist = projects.length * FRAME_SPACING;
    const cameraState = { z: 5, lookTargetX: 0 };

    gsap.to(cameraState, {
        z: endZ + 15, // Walk past the last project to the end text
        ease: "none",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: `+=${totalDist * 30}`,
            scrub: 2, 
            pin: true,
            onUpdate: (self) => {
                const currentZ = cameraState.z;
                let active = null;
                
                // HIGHLIGHT LOGIC
                frames.forEach(f => {
                    const dist = Math.abs(currentZ - (f.z + 5));
                    
                    if (dist < 10) {
                        active = f;
                        // Smooth Highlight: Scale Up Frame & Brighten Light
                        f.group.position.lerp(new THREE.Vector3(
                            f.isLeft ? -5.5 : 5.5, // Move slightly off wall
                            2.5, 
                            f.z
                        ), 0.1);
                        f.spot.intensity = THREE.MathUtils.lerp(f.spot.intensity, 15, 0.1);
                    } else {
                        // Reset
                        f.group.position.lerp(new THREE.Vector3(
                            f.isLeft ? -5.9 : 5.9, 
                            2.5, 
                            f.z
                        ), 0.1);
                        f.spot.intensity = THREE.MathUtils.lerp(f.spot.intensity, 5, 0.1);
                    }
                });

                // Head Turning
                if (active) {
                    const targetX = active.isLeft ? -5 : 5;
                    gsap.to(cameraState, { lookTargetX: targetX, duration: 1, ease: "power2.out" });
                    
                    if (activeProject?.id !== active.project.id) {
                        setActiveProject({ ...active.project, index: active.index });
                    }
                } else {
                    gsap.to(cameraState, { lookTargetX: 0, duration: 1.5, ease: "power2.inOut" });
                }
            }
        }
    });

    const animate = () => {
        cameraGroup.position.z = cameraState.z;
        const lookAtVector = new THREE.Vector3(cameraState.lookTargetX, 1.7, cameraState.z - 10);
        camera.lookAt(lookAtVector);
        camera.position.y = 1.7 + Math.sin(Date.now() * 0.003) * 0.02; // Bobbing
        
        // Floating End Text
        endPlane.position.y = 2 + Math.sin(Date.now() * 0.002) * 0.2;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };
    animate();

    // 10. CLICK INTERACTION (POP UP)
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children, true);
        const hit = intersects.find(i => i.object.userData.id);
        
        if (hit) {
            const pid = hit.object.userData.id;
            const proj = projects.find(p => p.id === pid);
            setZoomedProject(proj); // Trigger Pop-up instead of navigate
        }
    };
    window.addEventListener('click', handleClick);

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener('click', handleClick);
        ScrollTrigger.getAll().forEach(t => t.kill());
        renderer.dispose();
    };

  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#EBE9E4]">
        <canvas ref={canvasRef} className="block w-full h-full outline-none cursor-pointer" />
        
        {/* INFO OVERLAY */}
        <div className={`absolute bottom-10 left-10 z-10 transition-opacity duration-500 ${zoomedProject ? 'opacity-0' : 'opacity-100'}`}>
            {activeProject && (
                <div className="bg-white/90 backdrop-blur-md p-6 border-l-4 border-[#BC4B32] shadow-xl max-w-md">
                    <span className="text-[#BC4B32] font-mono text-xs tracking-widest uppercase mb-2 block">
                        0{activeProject.index + 1}
                    </span>
                    <h2 className="text-4xl font-bold text-[#1A1A1A] font-serif mb-1">
                        {activeProject.title}
                    </h2>
                    <p className="text-[#666666] text-sm mb-0">
                        {activeProject.location}
                    </p>
                    <div className="mt-3 text-xs font-bold text-[#1A1A1A] flex items-center gap-2 animate-pulse">
                        TAP IMAGE TO EXPAND <ArrowRight size={14}/>
                    </div>
                </div>
            )}
        </div>

        {/* --- CINEMATIC POP-UP MODAL (ZOOM EFFECT) --- */}
        <AnimatePresence>
            {zoomedProject && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-10"
                >
                    <motion.div 
                        initial={{ scale: 0.8, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: 50 }}
                        className="bg-[#F8F7F5] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row rounded-sm relative"
                    >
                        {/* Close Button */}
                        <button 
                            onClick={() => setZoomedProject(null)}
                            className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white text-black p-2 rounded-full transition-all"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Side */}
                        <div className="w-full md:w-2/3 h-64 md:h-auto bg-black relative">
                             <img 
                                src={zoomedProject.image} 
                                alt={zoomedProject.title} 
                                className="w-full h-full object-cover"
                             />
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-[#1A1A1A] text-white">
                             <span className="text-[#BC4B32] font-mono tracking-widest text-sm mb-4">
                                PROJECT DETAILS
                             </span>
                             <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight text-[#F8F7F5]">
                                {zoomedProject.title}
                             </h2>
                             <p className="text-gray-400 mb-8 leading-relaxed">
                                Situated in {zoomedProject.location}, this project represents a dialogue between modern structure and natural environment.
                             </p>
                             
                             <button 
                                onClick={() => navigate(`/projects/${zoomedProject.id}`)}
                                className="group flex items-center gap-3 bg-[#BC4B32] text-white px-6 py-4 hover:bg-white hover:text-[#1A1A1A] transition-all duration-300 w-fit"
                             >
                                <span className="uppercase tracking-widest font-bold text-sm">Open Case Study</span>
                                <ExternalLink size={18} />
                             </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* INSTRUCTIONS */}
        <div className="absolute top-10 right-10 text-[#1A1A1A]/30 font-mono text-xs tracking-[0.3em] pointer-events-none">
             SCROLL TO WALK
        </div>
    </div>
  );
};

export default Projects;