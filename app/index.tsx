import { Redirect } from "expo-router";

export default function Index() {
	// Always redirect to intro on initial load
	return <Redirect href="/(main)" />;
}
