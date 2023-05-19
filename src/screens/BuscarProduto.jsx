import { View } from "react-native";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import { FlatList } from "react-native-web";

export default function buscarProduto( ) {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState([]);

     async function buscarProduto() {
        const produtosRef = collection(db, 'produtos')
        const buscaProdutos = query(produtosRef, where('NomeDoProduto', '==', busca))
        const resultadoSnapshot = await getDocs(buscaProdutos);

        const listaProdutos = resultadoSnapshot.docs.map(doc => doc.data())
        console.log(listaProdutos);
        setResultado(listaProdutos);
     }

    useEffect(
        () => {
           buscarProduto();
        }, [busca]
    )

    return (
        <View>
        <Text> Produtos </Text>
        <TextInput
        label= "Faça sua busca"
        value={busca}
        onChangeText={setBusca}
         />

           <FlatList
                data={resultado}
                renderItem={({ item }) => <Text key={item.id}>{item.NomeDoProduto}</Text>}
            />

        </View>
    )

}