import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StatusBar,
  Alert,
  Image,
  ImageBackground,
  Switch,
} from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  splashContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  splashTitle: { fontSize: 42, fontWeight: 'bold', marginTop: 10 },
  loginOverlay: { flex: 1, justifyContent: 'center' },
  themeTopRow: { position: 'absolute', top: 50, right: 20 },
  brandTitleLight: { fontSize: 36, fontWeight: 'bold', color: '#FFF', textAlign: 'center', marginBottom: 20 },
  formCard: { borderRadius: 20, padding: 20 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  roleButton: { padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  input: { padding: 15, borderRadius: 12, marginBottom: 15 },
  primaryButton: { padding: 15, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold' },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  quickButton: { width: '48%', padding: 20, borderRadius: 15, marginBottom: 10, alignItems: 'center' },
  bottomNav: { position: 'absolute', bottom: 20, left: 20, right: 20, padding: 15, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-around', elevation: 10 },
  foodCard: { borderRadius: 15, overflow: 'hidden', marginBottom: 20 },
  viewCartBanner: { padding: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  listCard: { padding: 15, borderRadius: 12, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' },
  totalCard: { padding: 20, borderRadius: 15, marginTop: 20 },
  addCartButton: { padding: 10, borderRadius: 8, alignItems: 'center' },
});

export default function App() {
  console.log("App component is rendering...");

  const [screen, setScreen] = useState('splash');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // CUSTOMER STATES
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [splitCount, setSplitCount] = useState('1');

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('login');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const theme = getTheme(isDarkMode);

  const navigate = (target) => setScreen(target);

  const goToHome = () => {
    setScreen('login');
    setCart([]);
    setUsername('');
    setPassword('');
  };

  const handleLogin = () => {
    if (selectedRole === 'Admin') {
      navigate('dashboard');
    } else {
      navigate('customerMenu');
    }
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    Alert.alert('Success', 'Item added to cart');
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart]);

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <SplashScreen theme={theme} />;
      case 'login':
        return (
          <LoginScreen
            theme={theme}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            onLogin={handleLogin}
          />
        );
      case 'dashboard':
        return <DashboardScreen theme={theme} navigate={navigate} selectedRole={selectedRole} goToHome={goToHome} />;
      case 'customerMenu':
        return (
          <CustomerMenuScreen
            theme={theme}
            navigate={navigate}
            goToHome={goToHome}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            addToCart={addToCart}
            cartCount={cart.length}
          />
        );
      case 'customerCart':
        return (
          <CustomerCartScreen
            theme={theme}
            navigate={navigate}
            cart={cart}
            cartTotal={cartTotal}
            splitCount={splitCount}
            setSplitCount={setSplitCount}
          />
        );
      case 'customerCheckout':
        return <CustomerCheckoutScreen theme={theme} navigate={navigate} cart={cart} cartTotal={cartTotal} />;
      default:
        return (
          <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <AppHeader theme={theme} title={screen.toUpperCase()} />
            <TouchableOpacity onPress={() => navigate('dashboard')} style={[styles.primaryButton, { backgroundColor: theme.primary }]}>
              <Text style={{ color: '#FFF' }}>Back to Dashboard</Text>
            </TouchableOpacity>
            <BottomNav theme={theme} navigate={navigate} current={screen} />
          </SafeAreaView>
        );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {renderScreen()}
    </View>
  );
}

// --- SUB-COMPONENTS ---

function getTheme(isDarkMode) {
  return {
    background: isDarkMode ? '#111827' : '#F8F5F0',
    card: isDarkMode ? '#1F2937' : '#FFFFFF',
    input: isDarkMode ? '#374151' : '#F3F4F6',
    text: isDarkMode ? '#F9FAFB' : '#1E1E1E',
    subText: isDarkMode ? '#D1D5DB' : '#6B7280',
    primary: '#1F4D3A',
    gold: '#D4AF37',
    border: isDarkMode ? '#4B5563' : '#E5E7EB',
    overlay: 'rgba(0,0,0,0.5)',
  };
}

function SplashScreen({ theme }) {
  return (
    <View style={[styles.splashContainer, { backgroundColor: theme.primary }]}>
      <Text style={{ fontSize: 80 }}>🍽</Text>
      <Text style={[styles.splashTitle, { color: theme.gold }]}>CheZay</Text>
    </View>
  );
}

function LoginScreen({ theme, isDarkMode, setIsDarkMode, username, setUsername, password, setPassword, selectedRole, setSelectedRole, onLogin }) {
  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800' }} style={{ flex: 1 }}>
      <View style={[styles.loginOverlay, { backgroundColor: theme.overlay }]}>
        <View style={styles.themeTopRow}>
          <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
        </View>
        <Text style={styles.brandTitleLight}>CheZay</Text>
        <View style={[styles.formCard, { backgroundColor: theme.card, margin: 20 }]}>
          <View style={styles.roleContainer}>
            {['Admin', 'User'].map((r) => (
              <TouchableOpacity key={r} onPress={() => setSelectedRole(r)} style={[styles.roleButton, { backgroundColor: selectedRole === r ? theme.primary : theme.input }]}>
                <Text style={{ color: selectedRole === r ? '#FFF' : theme.text }}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput style={[styles.input, { backgroundColor: theme.input, color: theme.text }]} placeholder="Username" value={username} onChangeText={setUsername} />
          <TextInput style={[styles.input, { backgroundColor: theme.input, color: theme.text }]} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.primary }]} onPress={onLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

function DashboardScreen({ theme, navigate, selectedRole, goToHome }) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title="Admin Panel" />
      <Text style={{ color: theme.text, fontSize: 18 }}>Welcome, {selectedRole}</Text>
      <View style={styles.quickActions}>
        {['Orders', 'Tables', 'Menu', 'Inventory', 'Reports', 'Settings'].map((item) => (
          <TouchableOpacity key={item} style={[styles.quickButton, { backgroundColor: theme.gold }]} onPress={() => navigate(item.toLowerCase())}>
            <Text style={{ fontWeight: 'bold' }}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={goToHome} style={{ marginTop: 20 }}><Text style={{ color: theme.primary, textAlign: 'center' }}>Logout</Text></TouchableOpacity>
      <BottomNav theme={theme} navigate={navigate} current="dashboard" />
    </SafeAreaView>
  );
}

function CustomerMenuScreen({ theme, navigate, addToCart, cartCount }) {
  const menu = [
    { id: 1, name: 'Biryani', price: 500, category: 'Desi', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400' },
    { id: 2, name: 'Burger', price: 450, category: 'Fast Food', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title="CheZay Menu" />
      <TouchableOpacity onPress={() => navigate('customerCart')} style={[styles.viewCartBanner, { backgroundColor: theme.gold }]}>
        <Text style={{ fontWeight: 'bold' }}>Cart: {cartCount} Items</Text>
      </TouchableOpacity>
      <ScrollView>
        {menu.map((item) => (
          <View key={item.id} style={[styles.foodCard, { backgroundColor: theme.card }]}>
            <Image source={{ uri: item.image }} style={{ width: '100%', height: 150 }} />
            <View style={{ padding: 10 }}>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: theme.primary }}>Rs. {item.price}</Text>
              <TouchableOpacity onPress={() => addToCart(item)} style={[styles.addCartButton, { backgroundColor: theme.gold, marginTop: 10 }]}>
                <Text>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <CustomerBottomNav theme={theme} navigate={navigate} current="customerMenu" cartCount={cartCount} />
    </SafeAreaView>
  );
}

function CustomerCartScreen({ theme, navigate, cart, cartTotal, splitCount, setSplitCount }) {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title="Cart" />
      <ScrollView>
        {cart.map((item, idx) => (
          <View key={idx} style={[styles.listCard, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text }}>{item.name} (x{item.qty})</Text>
            <Text style={{ color: theme.primary }}>Rs. {item.price * item.qty}</Text>
          </View>
        ))}
        <View style={[styles.totalCard, { backgroundColor: theme.card }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Total: Rs. {cartTotal}</Text>
          <TouchableOpacity onPress={() => navigate('customerCheckout')} style={[styles.primaryButton, { backgroundColor: theme.primary, marginTop: 10 }]}>
            <Text style={{ color: '#FFF' }}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <CustomerBottomNav theme={theme} navigate={navigate} current="customerCart" cartCount={cart.length} />
    </SafeAreaView>
  );
}

// INTEGRATED LOGIC HERE
function CustomerCheckoutScreen({ theme, navigate, cart, cartTotal }) {
  const placeOrder = async () => {
    try {
      const orderData = {
        orderId: "ORD-" + Math.floor(Math.random() * 10000),
        itemsList: cart.map(item => `${item.name} (x${item.qty})`).join(", "),
        totalBill: cartTotal + 200,
        deliveryLocation: "Customer Address"
      };

      const response = await fetch('http://localhost:5050/place-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Order Placed and logged in terminal!');
        console.log("Server Response:", result);
      } else {
        Alert.alert('Error', 'Server connection failed');
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert('Error', 'Make sure your backend server is running!');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <AppHeader theme={theme} title="Checkout" />
      <View style={[styles.formCard, { backgroundColor: theme.card }]}>
        <Text style={{ color: theme.text, fontSize: 18 }}>Payable: Rs. {cartTotal + 200}</Text>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: '#16A34A', marginTop: 20 }]}
          onPress={placeOrder}
        >
          <Text style={{ color: '#FFF' }}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- UTILS ---
function AppHeader({ theme, title }) { return <View style={{ paddingVertical: 20 }}><Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.primary }}>{title}</Text></View>; }

function BottomNav({ theme, navigate, current }) {
  return (
    <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
      {['Dashboard', 'Settings'].map((n) => (
        <TouchableOpacity key={n} onPress={() => navigate(n.toLowerCase())}>
          <Text style={{ color: current === n.toLowerCase() ? theme.primary : theme.subText }}>{n}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function CustomerBottomNav({ theme, navigate, current, cartCount }) {
  return (
    <View style={[styles.bottomNav, { backgroundColor: theme.card }]}>
      <TouchableOpacity onPress={() => navigate('customerMenu')}><Text style={{ color: current === 'customerMenu' ? theme.primary : theme.subText }}>Menu</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => navigate('customerCart')}><Text style={{ color: current === 'customerCart' ? theme.primary : theme.subText }}>Cart({cartCount})</Text></TouchableOpacity>
    </View>
  );
}
