import { useEffect, useState } from "react";
import { View } from "react-native";
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FlatList } from "react-native-web";
import { Text, TextInput } from "react-native-paper";

export default function BuscarCarro( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function buscarCarros() {
        const carroRef = collection(db, 'carros')
        const buscaCarros = query(carroRef, where('ModeloCarro', '==', busca))
        const resultadoSnapshot = await getDocs(buscaCarros);

        const listaCarros = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaCarros);
        setResultado(listaCarros);
     }

    useEffect(
        () => {
           buscarCarros();
        }, [busca]
    )

    return (
        <View>
        <Text> Carros </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.ModeloCarro}</Text>}
            />

        </View>
    )

}