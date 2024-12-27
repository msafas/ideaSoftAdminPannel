import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ToastType, useToast } from '../../Contexts/ToastProvider';
import Icon from '../../svg/svg';
import { RefreshControl } from 'react-native-gesture-handler';

export default function ProductAddedScreen() {
    const theme = useTheme();
    const navigation = useNavigation();
    const toast = useToast();

    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [barcode, setBarcode] = useState('');
    const [stockAmount, setStockAmount] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState('TL');
    const [discountType, setDiscountType] = useState(0);
    const [taxIncluded, setTaxIncluded] = useState(1);
    const [stockTypeLabel, setStockTypeLabel] = useState('Piece');
    const [customShippingDisabled, setCustomShippingDisabled] = useState(1);
    const [hasGift, setHasGift] = useState(0);
    const [status, setStatus] = useState(1);
    const [hasOption, setHasOption] = useState(0);
    const [categoryShowcaseStatus, setCategoryShowcaseStatus] = useState(0);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const handleAddProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                'https://testcase.myideasoft.com/admin-api/products',
                {


                        "name": name,
                        "fullName": "",
                        "slug": "",
                        "sku": sku,
                        "barcode": barcode,
                        "stockAmount": parseFloat(stockAmount),
                        "price1": parseFloat(price),
                        "currency": {
                            "id": 3,
                            "label": currency,
                            "abbr": currency
                        },
                        "discount": 450.0,
                        "discountType": discountType,
                        "moneyOrderDiscount": 5.0,
                        "buyingPrice": 0.0,
                        "marketPriceDetail": null,
                        "taxIncluded": taxIncluded,
                        "tax": 18,
                        "warranty": 12,
                        "volumetricWeight": 0.0,
                        "stockTypeLabel": stockTypeLabel,
                        "customShippingDisabled": customShippingDisabled,
                        "customShippingCost": 0.0,
                        "distributor": "DISTRIBUTOR",
                        "hasGift": hasGift,
                        "gift": "",
                        "status": status,
                        "hasOption": hasOption,
                        "installmentThreshold": "-",
                        "homeSortOrder": 424,
                        "popularSortOrder": 424,
                        "brandSortOrder": null,
                        "featuredSortOrder": 424,
                        "campaignedSortOrder": 424,
                        "newSortOrder": 424,
                        "discountedSortOrder": 424,
                        "categoryShowcaseStatus": categoryShowcaseStatus,
                        "midblockSortOrder": null,
                        "pageTitle": "GNY TEST 5",
                        "metaDescription": "KISA ACIKLAMA",
                        "metaKeywords": "ANAHTAR, KELIMELER",
                        "canonicalUrl": null,
                        "parent": null,
                        "brand": null,
                        "detail": {
                            "id": 69,
                            "details": "Detayli aciklama burada yer aliyor",
                            "extraDetails": null
                        },
                        "categories": [
                            {
                                "id": 299,
                                "name": "Test Product Update 5",
                                "sortOrder": 5,
                                "showcaseSortOrder": null,
                                "pageTitle": null,
                                "metaDescription": null,
                                "metaKeywords": "424242",
                                "canonicalUrl": null,
                                "tree": "Test Product Update 5",
                                "imageUrl": null
                            }
                        ],
                        "prices": [],
                        "images": [ ],
                        "optionGroups": [],
                
                },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer AX5FTZ7UBAABUDT6XYYPW7LX',
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                toast.show(ToastType.Success, 'Ürün başarıyla eklendi');
                navigation.goBack();
            } else {
                toast.show(ToastType.Error, 'Ürün eklenirken bir hata oluştu');
            }
        } catch (error) {
            toast.show(ToastType.Error, `Ürün eklenirken bir hata oluştu: ${error.response ? error.response.data.message : error.message}`);
        } finally {
            setLoading(false);
        }
    };

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

            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerContainer}>
                <Icon iconName={"back"} size={20} color={theme.colors.primary} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ürün Ekle</Text>
            </TouchableOpacity>

                     <KeyboardAvoidingView
                           style={{ flex: 1 }}
                           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                       >
                           <ScrollView contentContainerStyle={styles.formContainer}     >
           
                <TextInput
                    style={styles.input}
                    placeholder="Ürün Adı"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="SKU"
                    value={sku}
                    onChangeText={setSku}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Barkod"
                    value={barcode}
                    onChangeText={setBarcode}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Stok Miktarı"
                    value={stockAmount}
                    onChangeText={setStockAmount}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fiyat"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Para Birimi (TL, USD vb.)"
                    value={currency}
                    onChangeText={setCurrency}
                />
                <TextInput
                    style={styles.input}
                    placeholder="İndirim Tipi"
                    value={discountType.toString()}
                    onChangeText={text => setDiscountType(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Vergi Dahil (1: Evet, 0: Hayır)"
                    value={taxIncluded.toString()}
                    onChangeText={text => setTaxIncluded(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Stok Tipi (Adet/Diğer)"
                    value={stockTypeLabel}
                    onChangeText={setStockTypeLabel}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Özel Kargo (1: Evet, 0: Hayır)"
                    value={customShippingDisabled.toString()}
                    onChangeText={text => setCustomShippingDisabled(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hediye Durumu (1: Evet, 0: Hayır)"
                    value={hasGift.toString()}
                    onChangeText={text => setHasGift(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Ürün Durumu (1: Aktif, 0: Pasif)"
                    value={status.toString()}
                    onChangeText={text => setStatus(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Seçenek Durumu (1: Evet, 0: Hayır)"
                    value={hasOption.toString()}
                    onChangeText={text => setHasOption(parseInt(text))}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Kategori Vitrin Durumu (1: Evet, 0: Hayır)"
                    value={categoryShowcaseStatus.toString()}
                    onChangeText={text => setCategoryShowcaseStatus(parseInt(text))}
                    keyboardType="numeric"
                />
                <Button title="Ürün Ekle" onPress={handleAddProduct} />
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    formContainer: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
});
