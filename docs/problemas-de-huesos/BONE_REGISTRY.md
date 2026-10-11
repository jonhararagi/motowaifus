# MACH-GIRLS — BONE REGISTRY

STATUS GENERAL: AUDIT IN PROGRESS

Este registro contiene los riesgos encontrados durante la auditoría arquitectónica.

# BONE-001 — INPUT SPAM / ACTION SYNCHRONIZATION
STATUS: GREEN / VERIFIED
Riesgo inicialmente identificado: el input de jugador podía alcanzar GameActions y CombatEngine mientras Presentation seguía reproduciendo una secuencia transitoria.
Tratamiento implementado: LOCK de acciones de jugador dependiente del estado real de CombatPresentation. Mientras Presentation está ocupada, CARD, BURST y ABILITY son rechazadas antes de llegar a GameActions/CombatEngine.
Recovery: el lock se mantiene hasta que Presentation deja de estar ocupada; no depende de un timeout artificial.
No se implementó una cola de acciones.
Evidencia de implementación: candidato funcional 35e9456ae7816d48b4f5b2d0dabe125e670e07e3; promoción funcional aplicada sobre mach-girls-2.5d.
CANDIDATE VALIDATION: CI remoto RUN 37807078957 / JOB 113414062871; test "BONE-001 locks rapid player combat input during active presentation and reopens after recovery" = PASS.
PROMOTED DEV HEAD VALIDATION: SHA 8ac72e8392fb6a045f5a12f6c7ad4270e527e7cd; Rocket Bunny Runtime Tests RUN 37822621222; BONE-001 = PASS.
BRAIN MVP revalidation: exact code candidate `536795bc51e70634187e263dda7c768e3d31a742`, full-suite CI RUN 38138152601 / JOB 114466217188; the rapid-input LOCK/recovery regression remains in the 254-test passing suite.
Conclusión: BONE-001 remains GREEN / VERIFIED; no queue or second clock was introduced.

# BONE-002 — VISUAL LIFECYCLE / DISPOSE
STATUS: AMBER
TRUE_LIFECYCLE_DEFECTS: 0
No se encontró una fuga funcional reproducible, duplicación continua de listeners o RAF, VFX inmortales, acumulación indefinida de actors ni crecimiento ilimitado de cachés dentro del MVP auditado.
La superficie actual de CombatPresentation/Scene no expone una API general dispose()/destroy(), pero esta ausencia no se clasifica como bug inmediato mientras el owner actual mantenga una instancia reutilizable y el runtime tenga recovery/reset.
CURRENT MVP:
- lifecycle operativo suficiente por reutilización + recovery/reset para el scope actual;
- owner actual: combat runtime / combat entrypoint;
- una instancia visual persistente durante la vida del runtime actual;
- mount actualmente implícito; no se añade una API de mount en esta fase.
DESIGN GAP:
- no existe todavía un contrato formal de ownership/dispose para navegación multi-screen o reemplazo definitivo del owner.
DECISIÓN:
- formalizar el contrato CREATE → MOUNT → ACTIVE → RECOVER / RESET → REUSE → DISPOSE;
- no implementar dispose()/destroy() general mientras el MVP no tenga una necesidad real de desmontaje;
- convertir Dispose en requisito cuando una instancia visual pueda perder definitivamente su owner.
OWNERSHIP:
- CombatPresentation: owner del estado de presentación;
- Scene: owner de actors/effects registrados dentro de la escena;
- Actor: owner de sus children/presentation state;
- VFX: owner de su estado transitorio mientras esté registrado en Scene;
- Renderer: no es owner del gameplay;
- GameState / CombatEngine: no dependen del lifecycle visual para existir.
FUTURE MULTI-SCREEN / TEARDOWN TRIGGERS:
cambio de pantalla que abandona la escena; recreación de CombatPresentation; reemplazo del canvas/context; múltiples instancias de presentación coexistiendo; mount/unmount repetido; listeners registrados por instancia; RAF dedicado por instancia; cachés que ya no deban vivir con el runtime.
Nota: mientras el runtime siga usando Canvas 2D, no asumir problemas de VRAM propios de WebGL.

# BONE-003 — EVENT CONTRACT / OBSERVABILITY
STATUS: AMBER
Ya existe un mecanismo basado en combat.events + MachGirlsPresentationEvents + CombatPresentation.consumeCombatEvents().
Por tanto, no es correcto clasificar el runtime actual como puro polling.
Riesgo restante: no existe todavía una autoridad general claramente documentada para separar GAMEPLAY EVENTS, PRESENTATION EVENTS, UI EVENTS y SYSTEM EVENTS.
Tratamiento: auditar primero el contrato existente antes de introducir un Event Bus nuevo. Evitar duplicar combat.events + EventBus + Dispatcher sin necesidad.
GREEN: una autoridad única de eventos y contrato documentado de consumo.

# BONE-004 — RNG DETERMINISM
STATUS: GREEN / VERIFIED
El repositorio contiene CombatRNG con normalizeSeed(), create(seed), next(), float(), chance() e int().
Las resoluciones consumen estado RNG explícito.
Conclusión: el riesgo de no tener seeded RNG ya está atendido.
No implementar otro RNG ni usar Math.random() dentro del Gameplay Core.

# BONE-005 — GLOBAL WINDOW / PUBLIC STATE
STATUS: AMBER
Los módulos están encapsulados en IIFE, pero exponen APIs públicas mediante window.GameState, window.CardSystem, window.CombatEngine, window.CariCombat y window.CombatPresentation.
getGameState() permite obtener el estado actual desde una superficie pública del entrypoint.
Riesgo real: superficie pública grande, mutadores potencialmente accesibles y fuerte acoplamiento global.
Esto no convierte al cliente web en una autoridad anti-cheat. La seguridad del cliente no debe tratarse como seguridad de servidor.
Tratamiento: auditar cada API como PUBLIC READ, PUBLIC COMMAND o INTERNAL ONLY.
GREEN: cambios de estado concentrados en comandos y reglas válidas con mínima superficie pública.

# BONE-006 — ENTRYPOINT / UI SPRAWL
STATUS: AMBER
combat.js concentra bootstrap, loop, HUD, hand, input de cartas, Burst, Ability, telemetry e integración con Presentation.
app.js concentra Telegram, DatabaseManager, SaveManager, RewardSystem, ProgressionSystem y reward/progression UI.
No existe UIManager dedicado.
Riesgo: al crecer Garage, Story, Collection y Relationships el entrypoint puede volverse monolítico.
Tratamiento: definir una frontera de UI antes de que el entrypoint crezca.
GREEN: separación clara sin duplicar GameState ni crear un segundo controller de combate.

# BONE-007 — DOCUMENTATION ↔ RUNTIME DRIFT
STATUS: AMBER
TRUE_DRIFT_COUNT: 0

Drifts corregidos en esta sincronización:
1. `docs/design/GAMEPLAY_GAP_ANALYSIS.md` documentaba Energy maximum = 3; el contrato runtime actual es Energy maximum = 100.
2. `docs/design/POST_PHASE16_CHARACTER_GAMEPLAY_SPEC.md` y `docs/design/GAMEPLAY_GAP_ANALYSIS.md` describían el current combat como PLAYER TURN → ENEMY TURN; el contrato runtime actual es SEMI_REALTIME / REAL_TIME, con comportamiento enemigo automático y sin ownership por turnos.

`YURI_EFFECTIVE_HAND_IS_INTENTIONAL = UNRESOLVED`
Clasificación: OPEN DESIGN QUESTION.
La mano efectiva de Yuri permanece documentada como CURRENT / VERIFIED / DERIVED FROM CURRENT RUNTIME = 4 cards y no se convierte en drift ni en decisión de diseño.

Conclusión: los 2 true drifts identificados por la auditoría han sido reconciliados documentalmente. BONE-007 permanece AMBER porque la sincronización elimina el drift factual actual, pero no convierte automáticamente la cuestión de diseño de Yuri en una decisión cerrada.

# BONE-008 — SAVE SCHEMA EVOLUTION
STATUS: GREEN / VERIFIED
El runtime actual utiliza `CURRENT_SAVE_VERSION = 2` para `bosozoku_player_save`. La migración v1→v2 añade `loadout` y `onboarding` por defecto y conserva player, progression, lastBattle, completedBattles y rewardLedger. Los tests cubren migración real de fixture v1, persistencia/reload de loadout y onboarding, save ausente y corrupción.
VALIDATION: exact code candidate `536795bc51e70634187e263dda7c768e3d31a742`; CI RUN 38138152601 / JOB 114466217188; 254 tests PASS, 0 FAIL.
Riesgo residual: cualquier futura ampliación del esquema debe introducir una migración incremental y conservar datos previos; la migración actual no implica soporte para versiones futuras desconocidas.
Conclusión: el riesgo inmediato de expansión del save que afectaba al deck/onboarding MVP queda atendido. BONE-008 GREEN / VERIFIED.

# BONE-009 — SINGLE TIME AUTHORITY
STATUS: AMBER
CombatClock y CombatEngine.advanceTime() son la autoridad temporal del gameplay. Presentation utiliza timestamps para curvas visuales.
Riesgo: futuras implementaciones podrían añadir timers de gameplay paralelos.
Tratamiento: un único reloj para gameplay; Presentation consume tiempo y no inventa simulación paralela.
GREEN: pruebas que demuestren que sistemas nuevos respetan la misma autoridad temporal.

# BONE-010 — SCRIPT LOAD ORDER
STATUS: AMBER
El runtime utiliza window.* y un orden explícito en index.html.
Riesgo: mover scripts por limpieza o refactor puede romper dependencias aunque cada archivo siga siendo sintácticamente válido.
Tratamiento: documentar dependency order y añadir verificaciones de bootstrap antes de reorganizar.
GREEN: contrato verificable de dependencias.

# BONE-011 — RENDERING AUTHORITY / DOUBLE DRAW
STATUS: AMBER
Existe Scene + SceneRenderer, pero CombatPresentation también contiene rutinas de dibujo como drawFighter, drawMotorcycle, drawAttack, drawImpact, drawBreak y drawBurst.
La composición actual funciona, pero la responsabilidad visual sigue parcialmente centralizada en CombatPresentation.
Riesgo: futuras capas podrían dibujar dos veces un mismo elemento.
Tratamiento: definir una única autoridad de render para CHARACTER, VEHICLE, VFX y HUD.
GREEN: una sola ruta de render por categoría visual.

# HEALTH SUMMARY
BONE-001 GREEN / VERIFIED
BONE-002 AMBER
BONE-003 AMBER
BONE-004 GREEN / VERIFIED
BONE-005 AMBER
BONE-006 AMBER
BONE-007 AMBER
BONE-008 GREEN / VERIFIED
BONE-009 AMBER
BONE-010 AMBER
BONE-011 AMBER

# GATE
No comenzar una gran fase de contenido nuevo mientras RED > 0.
Cuando RED = 0, revisar de nuevo todos los AMBER y convertir cada riesgo crítico en GREEN o marcarlo explícitamente como OUTSIDE-SCOPE con una razón documentada.

# PRINCIPIO
No queremos que el juego funcione solo porque los tests actuales pasan. Queremos contratos estructurales claros antes de hacerlo crecer.

## BRAIN MVP validation note — 2026-10-11

Current tested code SHA: `536795bc51e70634187e263dda7c768e3d31a742`. GitHub Actions exact-checkout run `38138152601` (job `114466217188`) passed syntax checks, focused first-session integration and the full suite (254/254). The integration test covers real preparation/deck selection, tutorial gates, an actual combat resolution, idempotent reward, persistent progression, the +5 combat definition in the next battle, and reuse of the selected deck.

Browser playthrough remains **NOT VERIFIED**. BONE-007 remains AMBER because unresolved design questions are not closed by automated test success. BONE-003, BONE-005, BONE-006, BONE-009, BONE-010 and BONE-011 retain their prior AMBER status; unrelated bone states were not changed.
