import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import "./table.css";

type TabType = "web" | "mobile" | "desktop";

const programmingLanguages = {
  web: [
    {
      name: "JavaScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      color: "#F7DF1E",
      description: "Frontend & Backend Development",
      frameworks: [
        {
          name: "React",
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
          type: "Frontend",
        },
        {
          name: "Angular",
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Angular_logo.svg",
          type: "Frontend",
        },
        {
          name: "Vue.js",
          icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
          type: "Frontend",
        },
        {
          name: "Node.js",
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
          type: "Backend",
        },
        {
          name: "Next.js",
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Nextjs-logo.svg",
          type: "Full Stack",
        },
      ],
    },
    {
      name: "TypeScript",
      icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/TypeScript-logo.svg",
      color: "#3178C6",
      description: "Typed JavaScript for Large Scale Applications",
      frameworks: [
        {
          name: "Angular",
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Angular_logo.svg",
          type: "Frontend",
        },
        {
          name: "NestJS",
          icon: "https://upload.wikimedia.org/wikipedia/commons/3/37/NestJS_Logo.svg",
          type: "Backend",
        },
      ],
    },
    {
      name: "Python",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
      color: "#306998",
      description: "Backend & Data Science",
      frameworks: [
        {
          name: "Django",
          icon: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg",
          type: "Backend",
        },
        {
          name: "Flask",
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d2/Flask_Logo.png",
          type: "Backend",
        },
        {
          name: "FastAPI",
          icon: "https://upload.wikimedia.org/wikipedia/commons/0/06/FastAPI_logo.svg",
          type: "Backend",
        },
      ],
    },
    {
      name: "Ruby",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/73/Ruby_logo.svg",
      color: "#CC0000",
      description: "Backend Development",
      frameworks: [
        {
          name: "Ruby on Rails",
          icon: "https://upload.wikimedia.org/wikipedia/commons/6/62/Ruby_on_Rails_logo.svg",
          type: "Backend",
        },
      ],
    },
  ],
  mobile: [
    {
      name: "Kotlin",
      icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Kotlin_Icon.png",
      color: "#7F52FF",
      description: "Android Development",
      frameworks: [
        {
          name: "Android SDK",
          icon: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Android_logo_2019.png",
          type: "Mobile",
        },
        {
          name: "Jetpack Compose",
          icon: "https://upload.wikimedia.org/wikipedia/commons/4/42/Jetpack_Compose_Logo.svg",
          type: "UI",
        },
      ],
    },
    {
      name: "Swift",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg",
      color: "#F05138",
      description: "iOS Development",
      frameworks: [
        {
          name: "UIKit",
          icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Apple_logo_black.svg",
          type: "UI",
        },
        {
          name: "SwiftUI",
          icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/SwiftUI_logo.svg",
          type: "UI",
        },
      ],
    },
    {
      name: "Flutter",
      icon: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flutter_logo_2021.svg",
      color: "#02569B",
      description: "Cross-platform Development",
      frameworks: [
        {
          name: "Flutter SDK",
          icon: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flutter_logo_2021.svg",
          type: "Cross-platform",
        },
      ],
    },
  ],
  desktop: [
    {
      name: "C#",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/47/C_Sharp_logo.svg",
      color: "#239120",
      description: "Windows Applications",
      frameworks: [
        {
          name: "WPF",
          icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/WPF_Logo.png",
          type: "UI",
        },
        {
          name: "WinForms",
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Windows_Forms_Logo.png",
          type: "UI",
        },
        {
          name: ".NET MAUI",
          icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/.NET_MAUI_logo.svg",
          type: "Cross-platform",
        },
      ],
    },
    {
      name: "Java",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Java_logo.png",
      color: "#007396",
      description: "Desktop & Web Applications",
      frameworks: [
        {
          name: "JavaFX",
          icon: "https://upload.wikimedia.org/wikipedia/commons/d/d7/JavaFX_Logo.png",
          type: "UI",
        },
        {
          name: "Spring Boot",
          icon: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Spring_Framework_Logo_2018.svg",
          type: "Backend",
        },
      ],
    },
    {
      name: "C++",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
      color: "#00599C",
      description: "High-Performance Applications",
      frameworks: [
        {
          name: "Qt",
          icon: "https://upload.wikimedia.org/wikipedia/commons/7/74/Qt_logo_2018.svg",
          type: "UI",
        },
      ],
    },
  ],
};

const AnimatedBackground = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
            ],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </Box>
  );
};

const MotionTableRow = motion(TableRow);
const MotionAvatar = motion(Avatar);
const MotionChip = motion(Chip);

const ProgrammingLanguagesTable = () => {
  const [tab, setTab] = useState<TabType>("web");
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    setTab(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        position: "relative",
      }}
    >
      <AnimatedBackground />

      <Card
        elevation={8}
        sx={{
          maxWidth: 1000,
          width: "100%",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component={motion.div}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            sx={{
              textAlign: "center",
              mb: 4,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #1a237e, #0d47a1)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Development Technologies
          </Typography>

          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
              },
            }}
          >
            <Tab value="web" label="Web Development" />
            <Tab value="mobile" label="Mobile Development" />
            <Tab value="desktop" label="Desktop Development" />
          </Tabs>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: "bold", width: "25%" }}>
                        Language
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold", width: "20%" }}>
                        Type
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Frameworks & Tools
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {programmingLanguages[tab].map((lang, index) => (
                      <MotionTableRow
                        key={lang.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        sx={{
                          transition: "all 0.3s ease",
                          backgroundColor:
                            hoveredRow === index
                              ? "rgba(25, 118, 210, 0.08)"
                              : "transparent",
                        }}
                      >
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <MotionAvatar
                              src={lang.icon}
                              whileHover={{ rotate: 360, scale: 1.2 }}
                              transition={{ duration: 0.8 }}
                              sx={{
                                backgroundColor: lang.color,
                                width: 50,
                                height: 50,
                                cursor: "pointer",
                                objectFit: "cover",
                              }}
                            />
                            <Box>
                              <Typography
                                variant="subtitle1"
                                fontWeight="medium"
                              >
                                {lang.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {lang.description}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                            sx={{
                              backgroundColor:
                                hoveredRow === index
                                  ? lang.color
                                  : "rgba(0, 0, 0, 0.08)",
                              color: hoveredRow === index ? "white" : "inherit",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {lang.frameworks.map((framework, fIndex) => (
                              <MotionChip
                                key={framework.name}
                                avatar={<Avatar src={framework.icon} />}
                                label={framework.name}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                  delay: index * 0.2 + fIndex * 0.1,
                                }}
                                whileHover={{ scale: 1.1 }}
                                sx={{
                                  backgroundColor:
                                    hoveredRow === index
                                      ? "#1976d2"
                                      : "#e3f2fd",
                                  color:
                                    hoveredRow === index ? "white" : "#1976d2",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    backgroundColor:
                                      hoveredRow === index
                                        ? "#1565c0"
                                        : "#bbdefb",
                                  },
                                }}
                              />
                            ))}
                          </Box>
                        </TableCell>
                      </MotionTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgrammingLanguagesTable;
