  {/* Connector Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    className={cn(
                      "w-6 h-6 rounded-full border-4 bg-black flex items-center justify-center pt-10",
                      index <= activeIndex
                        ? "border-indigo-500"
                        : "border-gray-600"
                    )}
                    animate={
                      index <= activeIndex
                        ? {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px rgba(99,102,241,0)",
                              "0 0 12px rgba(99,102,241,0.6)",
                              "0 0 0px rgba(99,102,241,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Card */}
                <Card className="bg-gray-900 border border-gray-700 shadow-lg w-full lg:w-[calc(50%-40px)] mt-12 lg:mt-0  ">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {event.step}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>


// helllo

<motion.div
                key={index}
                className={cn(
                  "relative flex items-center mb-16 flex-col lg:flex-row",
                  cardAlignment === "alternating"
                    ? index % 2 === 0
                      ? "lg:justify-start"
                      : "lg:flex-row-reverse lg:justify-start"
                    : cardAlignment === "left"
                    ? "lg:justify-start"
                    : "lg:flex-row-reverse lg:justify-start"
                )}
                variants={getCardVariants(index)}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: false, margin: "-100px" }}
                style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
              >
                {/* Connector Dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                  <motion.div
                    className={cn(
                      "w-6 h-6 rounded-full border-4 bg-black flex items-center justify-center pt-10",
                      index <= activeIndex
                        ? "border-indigo-500"
                        : "border-gray-600"
                    )}
                    animate={
                      index <= activeIndex
                        ? {
                            scale: [1, 1.3, 1],
                            boxShadow: [
                              "0 0 0px rgba(99,102,241,0)",
                              "0 0 12px rgba(99,102,241,0.6)",
                              "0 0 0px rgba(99,102,241,0)",
                            ],
                          }
                        : {}
                    }
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Card */}
                <Card className="bg-gray-900 border border-gray-700 shadow-lg w-full lg:w-[calc(50%-40px)] mt-12 lg:mt-0  ">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {event.step}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>