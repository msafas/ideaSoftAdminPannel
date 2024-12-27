import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from '../../Components/Header/Header';
import Icon from '../../svg/svg';
import { FAB } from 'react-native-paper'; // FAB bileşeni
import { ToastType, useToast } from '../../Contexts/ToastProvider';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from '../../Redux/Slice/productSlice';

export default function ProductsScreen() {
    const theme = useTheme();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const toast = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://testcase.myideasoft.com/admin-api/products', {
                headers: {
                    Authorization: `Bearer AX5FTZ7UBAABUDT6XYYPW7LX`,
                },
            });
            if (response.status === 200) {
                setProducts(response.data || []);

            } else {
                toast.show(ToastType.Error, 'Ürünler getirilirken bir hata oluştu');
            }
        } catch (error) {
            console.error('Ürünleri çekerken hata:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const response = await axios.delete(`https://testcase.myideasoft.com/admin-api/products/${id}`, {
                headers: {
                    Authorization: `Bearer AX5FTZ7UBAABUDT6XYYPW7LX`,
                },
            });
            if (response.status === 204) {
                toast.show(ToastType.Success, 'Ürün başarıyla silindi.');
                fetchProducts(); // Ürün listesini yenile
            } else {
                console.error('Ürün silinirken bir hata oluştu.');
            }
        } catch (error) {
            console.error('Ürün silme işlemi başarısız:', error);
        }
    };
    const handleProductClick = (item: any) => {
        dispatch(setSelectedProduct(item)); // Ürünü Redux'a aktar
        navigation.navigate('ProductDetailScreen'); // Detay sayfasına yönlendir
    };

    const renderProductItem = ({ item }: { item: any }) => (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => handleProductClick(item)} style={styles.itemContent}>
                <View style={styles.textContent}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>Fiyat: {item.price} TL</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => handleDelete(item.id)}>
                        <Icon iconName="delete" size={20} color={theme.colors.primary} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
                <Text>Yükleniyor...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <Header />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => fetchProducts()}
                        colors={[theme.colors.primary]}
                    />
                }
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductItem}
                contentContainerStyle={styles.flatListContent}
            />
            <FAB
                style={styles.fab}
                icon={() => <Icon iconName="plus" size={20} color="#fff" />}
                onPress={() => navigation.navigate('ProductAddedScreen')}
                theme={{ colors: { accent: theme.colors.primary } }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    flatListContent: {
        padding: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    itemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContent: {
        flex: 1,
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    iconButton: {
        marginVertical: 5,
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#6200ea',
    },
});
