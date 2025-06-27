import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Linking, Text, View, StyleSheet, Image } from "react-native";
import HomeScreen from "../Home/Home";
import {
  Feather,
  FontAwesome,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const drawerLabelStyle = { color: "#ffffff", fontSize: 16, marign: 20, paddingLeft:30, };

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <DrawerContentScrollView
          {...props}
          style={{ backgroundColor: "#4864AC" }}
        >
          <View style={styles.name}>
            <Image
              source={require("@/assets/images/icon.png")} // or use relative path
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginRight: 12,
              }}
            />
            <View style={styles.menu}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "light",
                  color: "#ffffff",
                }}
              >
                JOHN DOE
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "semibold",
                  color: "#ffffff",
                }}
              >
                STUDENT
              </Text>
            </View>
          </View>

          <DrawerItem
            labelStyle={drawerLabelStyle}
            icon={({ size }) => (
              <Ionicons name="home-outline" size={size} color="#ffffff" />
            )}
            label="HOME"
            onPress={() => props.navigation.navigate("home")}
          />

          <View style={styles.statDivider} />

          <DrawerItem
            labelStyle={drawerLabelStyle}
            icon={({ size }) => (
              <Feather name="pie-chart" size={size} color="#ffffff" />
            )}
            label="LAST QUIZ REVIEW"
            onPress={() => props.navigation.navigate("last-quiz")}
          />

          <View style={styles.statDivider} />

          <DrawerItem
            labelStyle={drawerLabelStyle}
            icon={({ size }) => (
              <Ionicons name="bulb-outline" size={size} color="#ffffff" />
            )}
            label="BB POINTS"
            onPress={() => props.navigation.navigate("bb-points")}
          />

          <View style={styles.statDivider} />

          <DrawerItem
            labelStyle={drawerLabelStyle}
            icon={({ size }) => (
              <SimpleLineIcons
                name="screen-desktop"
                size={size}
                color="#ffffff"
              />
            )}
            label="WEBSITE"
            onPress={() => Linking.openURL("https://yourwebsite.com")}
          />

          <View style={styles.statDivider} />

          <View style={styles.footer}>
            <Text style={styles.footerText}>BOARDBULLETS</Text>
          </View>
          
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen name="home" component={HomeScreen} />
      {/* <Drawer.Screen name="last-quiz" component={LastQuizScreen} />
      <Drawer.Screen name="bb-points" component={BBPointsScreen} /> */}
      
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: "column",
    marginTop: 8,
    marginBottom: 40,
  },
  name: {
    flexDirection: "row",
    marginLeft: 15,
    marginTop: 30,
  },
  statDivider: {
    width: "90%",
    height: 1,
    backgroundColor: Colors.lightColor,
    fontWeight: "light",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footer: {
  padding: 16,
  marginTop:"82%",
  alignItems: 'center',
},

footerText: {
  color: '#ffffff',
  fontSize: 34,
  fontWeight: 'semibold',
  letterSpacing: 1,
},

});

export default DrawerNavigator;
