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


//why work with me cards
<section className="w-full bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-16">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-14"
      >
        Why Work With <span className="text-green-400">Me</span>
      </motion.h2>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="bg-gray-800/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl hover:shadow-2xl border border-gray-700 flex flex-col items-center text-center transform perspective-1000"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>