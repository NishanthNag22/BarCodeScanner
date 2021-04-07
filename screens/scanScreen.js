import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor() {
        console.log("constructor")
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: "",
            buttonState: "normal"
        }
    }
    getCameraPermissions = async () => {
        console.log("function-1")
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: "clicked",
            scanned: false
        })
    }

    handleBarCodeScanned = async (type, data) => {
        console.log("function-2")
        console.log("function-2")
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: "normal"
        })
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if (buttonState === "clicked" && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject} />
            )
        } else if (buttonState === "normal") {
            return (
                <View>
                    <View>
                        <Image
                            source={require("../assets/scan.jpg")}
                            style={{ width: 200, height: 200 }} />
                        <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>Bar Code Scanner</Text>
                    </View>
                    <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>
                        {hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permissions"}
                    </Text>
                    <TouchableOpacity
                        onPress={this.getCameraPermissions}
                        style={styles.button}
                        title="Bar Code Scanner">
                        <Text style={styles.buttonText}>Scan QR Code</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'blue',
        width: 100,
        height: 50,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})