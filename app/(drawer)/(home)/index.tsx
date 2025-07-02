// // app/(drawer)/home.tsx
import HomeScreen from "@/components/Home/Home";

// import {
//     View,
//     Text,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     SafeAreaView,
//     StatusBar,
//   } from 'react-native';
//   import { Ionicons } from '@expo/vector-icons';
  
//   interface MenuItem {
//     id: string;
//     title: string;
//     icon: keyof typeof Ionicons.glyphMap;
//     isActive?: boolean;
//   }
  
//   const SidebarComponent: React.FC = () => {
//     const [activeItem, setActiveItem] = useState<string>('home');
  
//     const menuItems: MenuItem[] = [
//       { id: 'home', title: 'HOME', icon: 'home-outline' },
//       { id: 'quiz', title: 'LAST QUIZ REVIEW', icon: 'document-text-outline' },
//       { id: 'points', title: 'MY POINTS', icon: 'trophy-outline' },
//       { id: 'reports', title: 'REPORTS', icon: 'bar-chart-outline' },
//     ];
  
//     const handleMenuPress = (itemId: string) => {
//       setActiveItem(itemId);
//     };
  
//     return (
//       <SafeAreaView style={styles.container}>
//         <StatusBar barStyle="light-content" backgroundColor="#4F7DF0" />
        
//         {/* Header Section */}
//         <View style={styles.header}>
//           <TouchableOpacity style={styles.menuButton}>
//             <Ionicons name="menu" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
  
//         {/* Profile Section */}
//         <View style={styles.profileSection}>
//           <View style={styles.profileImageContainer}>
//             <Image 
//               source={{ uri: 'https://via.placeholder.com/60x60/CCCCCC/666666?text=JD' }}
//               style={styles.profileImage}
//             />
//           </View>
//           <Text style={styles.profileName}>JOHN DOE</Text>
//           <Text style={styles.profileRole}>STUDENT</Text>
//         </View>
  
//         {/* Menu Items */}
//         <View style={styles.menuContainer}>
//           {menuItems.map((item) => (
//             <TouchableOpacity
//               key={item.id}
//               style={[
//                 styles.menuItem,
//                 activeItem === item.id && styles.activeMenuItem
//               ]}
//               onPress={() => handleMenuPress(item.id)}
//               activeOpacity={0.7}
//             >
//               <Ionicons 
//                 name={item.icon} 
//                 size={20} 
//                 color={activeItem === item.id ? "#4F7DF0" : "rgba(255,255,255,0.8)"} 
//                 style={styles.menuIcon}
//               />
//               <Text style={[
//                 styles.menuText,
//                 activeItem === item.id && styles.activeMenuText
//               ]}>
//                 {item.title}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
  
//         {/* Bottom Section */}
//         <View style={styles.bottomSection}>
//           <Text style={styles.appName}>BOARDBULLETS</Text>
//         </View>
//       </SafeAreaView>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#4F7DF0',
//       width: 280,
//     },
//     header: {
//       paddingHorizontal: 20,
//       paddingVertical: 15,
//       alignItems: 'flex-end',
//     },
//     menuButton: {
//       padding: 5,
//     },
//     profileSection: {
//       alignItems: 'center',
//       paddingHorizontal: 20,
//       paddingVertical: 30,
//     },
//     profileImageContainer: {
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: 15,
//     },
//     profileImage: {
//       width: 50,
//       height: 50,
//       borderRadius: 25,
//     },
//     profileName: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: 'white',
//       marginBottom: 5,
//       letterSpacing: 0.5,
//     },
//     profileRole: {
//       fontSize: 12,
//       color: 'rgba(255,255,255,0.8)',
//       letterSpacing: 0.5,
//     },
//     menuContainer: {
//       flex: 1,
//       paddingTop: 20,
//     },
//     menuItem: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingHorizontal: 20,
//       paddingVertical: 15,
//       marginHorizontal: 10,
//       borderRadius: 8,
//       marginBottom: 5,
//     },
//     activeMenuItem: {
//       backgroundColor: 'white',
//       shadowColor: '#000',
//       shadowOffset: {
//         width: 0,
//         height: 2,
//       },
//       shadowOpacity: 0.1,
//       shadowRadius: 4,
//       elevation: 3,
//     },
//     menuIcon: {
//       marginRight: 15,
//       width: 20,
//     },
//     menuText: {
//       fontSize: 13,
//       color: 'rgba(255,255,255,0.9)',
//       fontWeight: '500',
//       letterSpacing: 0.5,
//     },
//     activeMenuText: {
//       color: '#4F7DF0',
//       fontWeight: '600',
//     },
//     bottomSection: {
//       paddingHorizontal: 20,
//       paddingBottom: 30,
//       alignItems: 'flex-start',
//     },
//     appName: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       color: 'white',
//       letterSpacing: 1,
//     },
//   });

export default HomeScreen;

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// interface MenuItem {
//   id: string;
//   title: string;
//   icon: keyof typeof Ionicons.glyphMap;
//   isActive?: boolean;
// }

// const SidebarComponent: React.FC = () => {
//   const [activeItem, setActiveItem] = useState<string>('home');

//   const menuItems: MenuItem[] = [
//     { id: 'home', title: 'HOME', icon: 'home-outline' },
//     { id: 'quiz', title: 'LAST QUIZ REVIEW', icon: 'document-text-outline' },
//     { id: 'points', title: 'MY POINTS', icon: 'trophy-outline' },
//     { id: 'reports', title: 'REPORTS', icon: 'bar-chart-outline' },
//   ];

//   const handleMenuPress = (itemId: string) => {
//     setActiveItem(itemId);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="#4F7DF0" />
      
//       {/* Header Section */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.menuButton}>
//           <Ionicons name="menu" size={24} color="white" />
//         </TouchableOpacity>
//       </View>

//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         <View style={styles.profileImageContainer}>
//           <Image 
//             source={{ uri: 'https://via.placeholder.com/60x60/CCCCCC/666666?text=JD' }}
//             style={styles.profileImage}
//           />
//         </View>
//         <Text style={styles.profileName}>JOHN DOE</Text>
//         <Text style={styles.profileRole}>STUDENT</Text>
//       </View>

//       {/* Menu Items */}
//       <View style={styles.menuContainer}>
//         {menuItems.map((item) => (
//           <TouchableOpacity
//             key={item.id}
//             style={[
//               styles.menuItem,
//               activeItem === item.id && styles.activeMenuItem
//             ]}
//             onPress={() => handleMenuPress(item.id)}
//             activeOpacity={0.7}
//           >
//             <Ionicons 
//               name={item.icon} 
//               size={20} 
//               color={activeItem === item.id ? "#4F7DF0" : "rgba(255,255,255,0.8)"} 
//               style={styles.menuIcon}
//             />
//             <Text style={[
//               styles.menuText,
//               activeItem === item.id && styles.activeMenuText
//             ]}>
//               {item.title}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Bottom Section */}
//       <View style={styles.bottomSection}>
//         <Text style={styles.appName}>BOARDBULLETS</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#4F7DF0',
//     width: 280,
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     alignItems: 'flex-end',
//   },
//   menuButton: {
//     padding: 5,
//   },
//   profileSection: {
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 30,
//   },
//   profileImageContainer: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: 'rgba(255,255,255,0.2)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   profileName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 5,
//     letterSpacing: 0.5,
//   },
//   profileRole: {
//     fontSize: 12,
//     color: 'rgba(255,255,255,0.8)',
//     letterSpacing: 0.5,
//   },
//   menuContainer: {
//     flex: 1,
//     paddingTop: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     marginHorizontal: 10,
//     borderRadius: 8,
//     marginBottom: 5,
//   },
//   activeMenuItem: {
//     backgroundColor: 'white',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   menuIcon: {
//     marginRight: 15,
//     width: 20,
//   },
//   menuText: {
//     fontSize: 13,
//     color: 'rgba(255,255,255,0.9)',
//     fontWeight: '500',
//     letterSpacing: 0.5,
//   },
//   activeMenuText: {
//     color: '#4F7DF0',
//     fontWeight: '600',
//   },
//   bottomSection: {
//     paddingHorizontal: 20,
//     paddingBottom: 30,
//     alignItems: 'flex-start',
//   },
//   appName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'white',
//     letterSpacing: 1,
//   },
// });

// export default SidebarComponent;
