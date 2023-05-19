import { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native-web";
import { Text, TextInput } from "react-native-paper";

export default function BuscarCor( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function buscarCores() {
        const coresRef = collection(db, 'cores')
        const buscaCores = query(coresRef, where('NomeCor', '==', busca))
        const resultadoSnapshot = await getDocs(buscaCores);

        const listaCores = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaCores);
        setResultado(listaCores);
     }

    useEffect(
        () => {
           buscarCores();
        }, [busca]
    )

    return (
        <View>
        <Text> Cores </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.NomeCor}</Text>}
            />

        </View>
    )

}