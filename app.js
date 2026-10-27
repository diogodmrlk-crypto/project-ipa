
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  Switch,
  StatusBar,
  StyleSheet,
} from "react-native";

const COLORS = {
  bg: "#090711",
  panel: "#151120",
  panel2: "#20172E",
  purple: "#A855F7",
  white: "#FFFFFF",
  muted: "#A69BB8",
  green: "#4ADE80",
};

const PALETTE = [
  { name: "Roxo", value: "#A855F7" },
  { name: "Ciano", value: "#22D3EE" },
  { name: "Amarelo", value: "#FACC15" },
  { name: "Branco", value: "#FFFFFF" },
];

function SectionTitle({ children }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

function ActionButton({ title, onPress, active = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.actionButton,
        active && { backgroundColor: COLORS.purple },
      ]}
    >
      <Text style={styles.actionButtonText}>{title}</Text>
    </Pressable>
  );
}

function ToggleRow({ title, subtitle, value, onValueChange, color }) {
  return (
    <View style={styles.toggleRow}>
      <View style={styles.toggleText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSubtitle}>{subtitle}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#393044", true: color }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export default function App() {
  const [enabled, setEnabled] = useState(false);
  const [showFov, setShowFov] = useState(true);
  const [showCrosshair, setShowCrosshair] = useState(true);
  const [showLines, setShowLines] = useState(false);
  const [fov, setFov] = useState(60);
  const [opacity, setOpacity] = useState(80);
  const [color, setColor] = useState("#A855F7");
  const [profile, setProfile] = useState("Padrão");
  const [tab, setTab] = useState("Visual");

  function applyProfile(name) {
    setProfile(name);

    if (name === "Compacto") {
      setFov(35);
      setOpacity(65);
      setColor("#FFFFFF");
    } else if (name === "Neon") {
      setFov(80);
      setOpacity(95);
      setColor("#22D3EE");
    } else {
      setFov(60);
      setOpacity(80);
      setColor("#A855F7");
    }
  }

  function resetSettings() {
    setEnabled(false);
    setShowFov(true);
    setShowCrosshair(true);
    setShowLines(false);
    setFov(60);
    setOpacity(80);
    setColor("#A855F7");
    setProfile("Padrão");
  }

  const tabs = ["Visual", "Ajustes", "Sobre"];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logo}>
            <Text style={[styles.logoText, { color }]}>A</Text>
          </View>

          <View style={styles.headerTitles}>
            <Text style={styles.kicker}>PAINEL VISUAL</Text>
            <Text style={styles.appTitle}>AUXÍLIO ANDROID</Text>
          </View>

          <View style={styles.statusPill}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: enabled ? COLORS.green : "#82788E" },
              ]}
            />
            <Text style={styles.statusText}>{enabled ? "ON" : "OFF"}</Text>
          </View>
        </View>

        <Card style={styles.hero}>
          <Text style={[styles.kicker, { color }]}>MODO VISUAL</Text>
          <Text style={styles.heroTitle}>Central de mira</Text>
          <Text style={styles.description}>
            Personalize as cores e os elementos visuais da sua interface.
          </Text>

          <Pressable
            onPress={() => setEnabled(!enabled)}
            style={[styles.primaryButton, { backgroundColor: color }]}
          >
            <Text style={styles.primaryButtonText}>
              {enabled ? "DESATIVAR PRÉVIA" : "ATIVAR PRÉVIA"}
            </Text>
          </Pressable>

          <View style={styles.previewHeader}>
            <Text style={styles.previewLabel}>PRÉ-VISUALIZAÇÃO</Text>
            <Text style={styles.previewHint}>DEMO</Text>
          </View>

          <View style={styles.preview}>
            {showFov && (
              <View
                style={[
                  styles.fovCircle,
                  {
                    width: 60 + fov,
                    height: 60 + fov,
                    borderColor: color,
                    opacity: opacity / 100,
                  },
                ]}
              />
            )}

            {showCrosshair && (
              <View style={styles.crosshair}>
                <View style={[styles.crossLineHorizontal, { backgroundColor: color }]} />
                <View style={[styles.crossLineVertical, { backgroundColor: color }]} />
                <View style={[styles.crossCenter, { backgroundColor: color }]} />
              </View>
            )}

            {showLines && (
              <View style={styles.decorativeLines}>
                <View style={[styles.decorativeLine, { backgroundColor: color }]} />
                <View style={[styles.decorativeLine, { backgroundColor: color }]} />
              </View>
            )}
          </View>
        </Card>

        <View style={styles.stats}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>FOV</Text>
            <Text style={[styles.statValue, { color }]}>{fov}</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>OPACIDADE</Text>
            <Text style={[styles.statValue, { color }]}>{opacity}%</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>PERFIL</Text>
            <Text style={styles.profileValue}>{profile}</Text>
          </Card>
        </View>

        <View style={styles.tabs}>
          {tabs.map((item) => (
            <Pressable
              key={item}
              onPress={() => setTab(item)}
              style={[
                styles.tab,
                tab === item && {
                  backgroundColor: color + "35",
                },
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === item && { color: COLORS.white },
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Card>
          {tab === "Visual" && (
            <>
              <SectionTitle>ELEMENTOS VISUAIS</SectionTitle>

              <ToggleRow
                title="Círculo de FOV"
                subtitle="Exibir círculo na prévia"
                value={showFov}
                onValueChange={setShowFov}
                color={color}
              />

              <ToggleRow
                title="Mira central"
                subtitle="Exibir cruz de referência"
                value={showCrosshair}
                onValueChange={setShowCrosshair}
                color={color}
              />

              <ToggleRow
                title="Linhas decorativas"
                subtitle="Elementos adicionais da interface"
                value={showLines}
                onValueChange={setShowLines}
                color={color}
              />

              <SectionTitle>COR DA INTERFACE</SectionTitle>
              <View style={styles.palette}>
                {PALETTE.map((item) => (
                  <Pressable
                    key={item.value}
                    onPress={() => setColor(item.value)}
                    style={[
                      styles.colorOption,
                      { backgroundColor: item.value },
                      color === item.value && styles.selectedColor,
                    ]}
                    accessibilityLabel={item.name}
                  >
                    {color === item.value && (
                      <Text style={styles.colorCheck}>✓</Text>
                    )}
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {tab === "Ajustes" && (
            <>
              <SectionTitle>TAMANHO DO FOV</SectionTitle>
              <View style={styles.adjustment}>
                <ActionButton
                  title="−"
                  onPress={() => setFov(Math.max(10, fov - 5))}
                />
                <Text style={styles.adjustmentValue}>{fov}</Text>
                <ActionButton
                  title="+"
                  onPress={() => setFov(Math.min(100, fov + 5))}
                />
              </View>

              <SectionTitle>OPACIDADE</SectionTitle>
              <View style={styles.adjustment}>
                <ActionButton
                  title="−"
                  onPress={() => setOpacity(Math.max(10, opacity - 5))}
                />
                <Text style={styles.adjustmentValue}>{opacity}%</Text>
                <ActionButton
                  title="+"
                  onPress={() => setOpacity(Math.min(100, opacity + 5))}
                />
              </View>

              <SectionTitle>PERFIS VISUAIS</SectionTitle>
              {["Padrão", "Compacto", "Neon"].map((name) => (
                <Pressable
                  key={name}
                  onPress={() => applyProfile(name)}
                  style={[
                    styles.profileButton,
                    profile === name && {
                      borderColor: color,
                      backgroundColor: color + "20",
                    },
                  ]}
                >
                  <Text style={styles.rowTitle}>{name}</Text>
                  <Text style={{ color }}>
                    {profile === name ? "✓" : "›"}
                  </Text>
                </Pressable>
              ))}

              <Pressable onPress={resetSettings} style={styles.resetButton}>
                <Text style={[styles.resetText, { color }]}>
                  RESTAURAR PADRÕES
                </Text>
              </Pressable>
            </>
          )}

          {tab === "Sobre" && (
            <>
              <SectionTitle>SOBRE O PROJETO</SectionTitle>
              <Text style={styles.aboutText}>
                AUXÍLIO ANDROID é uma demonstração visual feita em React
                Native para iOS.
              </Text>
              <Text style={styles.aboutText}>
                Os controles alteram apenas esta interface. O app não
                modifica jogos, não realiza mira automática e não desenha
                por cima de outros aplicativos.
              </Text>
              <Text style={styles.aboutText}>
                Versão 1.0.0 · Bundle ID configurável em app.json.
              </Text>
            </>
          )}
        </Card>

        <Text style={styles.footer}>AUXÍLIO ANDROID • VERSÃO 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: "#241333",
    borderWidth: 1,
    borderColor: "#67339B",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 26,
    fontWeight: "900",
  },
  headerTitles: {
    flex: 1,
  },
  kicker: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
  appTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    marginTop: 4,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 9,
    borderRadius: 20,
    backgroundColor: COLORS.panel,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "900",
  },
  card: {
    backgroundColor: COLORS.panel,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2A2037",
  },
  hero: {
    backgroundColor: COLORS.panel2,
    padding: 18,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    marginTop: 10,
  },
  description: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  primaryButton: {
    alignSelf: "flex-start",
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  previewHeader: {
    borderTopWidth: 1,
    borderTopColor: "#3A2C49",
    marginTop: 18,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "800",
  },
  previewHint: {
    color: COLORS.purple,
    fontSize: 10,
    fontWeight: "900",
  },
  preview: {
    height: 180,
    backgroundColor: "#0B0910",
    borderRadius: 15,
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  fovCircle: {
    position: "absolute",
    borderWidth: 2,
    borderRadius: 999,
  },
  crosshair: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  crossLineHorizontal: {
    position: "absolute",
    width: 26,
    height: 2,
  },
  crossLineVertical: {
    position: "absolute",
    width: 2,
    height: 26,
  },
  crossCenter: {
    width: 4,
    height: 4,
    borderRadius: 3,
  },
  decorativeLines: {
    position: "absolute",
    bottom: 18,
    left: 25,
    right: 25,
    gap: 5,
  },
  decorativeLine: {
    height: 2,
    borderRadius: 3,
  },
  stats: {
    flexDirection: "row",
    gap: 8,
  },
  statCard: {
    flex: 1,
    padding: 12,
    borderRadius: 15,
  },
  statLabel: {
    color: COLORS.muted,
    fontSize: 9,
    fontWeight: "800",
  },
  statValue: {
    fontSize: 19,
    fontWeight: "900",
    marginTop: 7,
  },
  profileValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 9,
  },
  tabs: {
    flexDirection: "row",
    padding: 4,
    gap: 4,
    backgroundColor: COLORS.panel,
    borderRadius: 14,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 10,
  },
  tabText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "800",
  },
  sectionTitle: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
    marginTop: 5,
    marginBottom: 12,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2B2235",
  },
  toggleText: {
    flex: 1,
    paddingRight: 10,
  },
  rowTitle: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
  rowSubtitle: {
    color: COLORS.muted,
    fontSize: 10,
    marginTop: 4,
  },
  palette: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 8,
  },
  colorOption: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  colorCheck: {
    color: "#111111",
    fontWeight: "900",
  },
  adjustment: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    marginBottom: 22,
  },
  adjustmentValue: {
    minWidth: 65,
    textAlign: "center",
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },
  actionButton: {
    backgroundColor: "#352442",
    minWidth: 46,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
  },
  profileButton: {
    padding: 14,
    marginBottom: 8,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#382B45",
    backgroundColor: "#1B1425",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resetButton: {
    alignItems: "center",
    padding: 14,
    marginTop: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#51346A",
  },
  resetText: {
    fontSize: 10,
    fontWeight: "900",
  },
  aboutText: {
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 12,
  },
  footer: {
    color: "#766B83",
    fontSize: 9,
    textAlign: "center",
    letterSpacing: 1.5,
    marginTop: 2,
  },
});
