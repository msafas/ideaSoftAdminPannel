import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function ProductDetailScreen() {
  const selectedProduct = useSelector((state) => state.selectedProduct.product); // Doğru key ile erişim

  if (!selectedProduct) {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Ürün bilgisi bulunamadı.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {selectedProduct?.images && selectedProduct?.images.length > 0 ? (
            <Image source={{ uri: selectedProduct?.images[0]?.url }} style={styles.image} />
          ) : (
            <Text style={styles.noImageText}>Görsel Bulunamadı</Text>
          )}

          {/* Ürün Bilgileri */}
          <Text style={styles.name}>{selectedProduct?.name}</Text>
          <Text style={styles.price}>
            Fiyat: {selectedProduct?.price1} {selectedProduct?.currency?.abbr}
          </Text>
          <Text style={styles.description}>
            Açıklama: {selectedProduct?.detail?.details || 'Açıklama mevcut değil.'}
          </Text>
          <Text style={styles.stock}>
            Stok Durumu: {selectedProduct?.stockAmount > 0 ? 'Stokta Var' : 'Stokta Yok'}
          </Text>
          <Text style={styles.tax}>KDV Oranı: %{selectedProduct?.tax}</Text>

          {/* Yeni Eklenecek Alanlar */}
          {selectedProduct?.barcode && (
            <Text style={styles.additionalInfo}>Barkod: {selectedProduct?.barcode}</Text>
          )}
          {selectedProduct?.brand && (
            <Text style={styles.additionalInfo}>Marka: {selectedProduct?.brand}</Text>
          )}
          {selectedProduct?.distributor && (
            <Text style={styles.additionalInfo}>Dağıtıcı: {selectedProduct?.distributor}</Text>
          )}
          {selectedProduct?.warranty && (
            <Text style={styles.additionalInfo}>Garanti Süresi: {selectedProduct?.warranty} ay</Text>
          )}
          {selectedProduct?.sku && (
            <Text style={styles.additionalInfo}>SKU: {selectedProduct?.sku}</Text>
          )}
          {selectedProduct?.metaDescription && (
            <Text style={styles.additionalInfo}>Açıklama: {selectedProduct?.metaDescription}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: 16,
  },
  container: {
    flex: 1,
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  stock: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  tax: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  noImageText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    marginBottom: 16,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
});
