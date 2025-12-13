import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationMenu } from "@/components/NavigationMenu";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function MenuScreen() {
	const colorScheme = useColorScheme() ?? "light";

	return (
		<View style={{ flex: 1 }}>
			<NavigationMenu
				navMenuVisible={true}
				setNavMenuVisible={() => {}}
				colorScheme={colorScheme}
			/>
		</View>
	);
}
