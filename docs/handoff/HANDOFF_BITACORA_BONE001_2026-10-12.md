# HANDOFF / BITÁCORA DE CONTINUIDAD — BONE-001

**Fecha de registro:** 2026-10-12  
**Repositorio:** `jonhararagi/motowaifus`  
**Propósito:** permitir que otro chat/agente retome el trabajo sin confundir hechos comprobados, hipótesis, tareas propuestas y cambios realmente realizados.

> **Estado global:** `BONE-001 = NOT VERIFIED`. Esta bitácora documenta la investigación; no declara resuelto el fallo.

## 1. Estado verificado antes de escribir esta bitácora

- Rama candidata consultada en GitHub: `validation/bone-001-candidate-fix-01`.
- HEAD remoto verificado: `fe8819ce8118274eafb31f56aee37335a5a1509e`.
- SHA padre: `90f631b13e31116b6a51e8b82f8e2cf2276ca882`.
- Mensaje del commit candidato: `test: restore telemetry in test harness`.
- PR #24: https://github.com/jonhararagi/motowaifus/pull/24
- Workflow Runtime Tests #136: https://github.com/jonhararagi/motowaifus/actions/runs/38198852885
- Job ID: `114647507924`.
- La rama se verificó contra GitHub inmediatamente antes de crear este documento. El HEAD observado coincide con el SHA candidato esperado.

## 2. Resultado del workflow #136

El job ejecutó:

```text
node --test tests/*.test.mjs
```

Resultado observado en los logs recuperados:

| Métrica | Resultado |
|---|---:|
| Tests totales | 248 |
| Pasaron | 221 |
| Fallaron | 27 |
| Omitidos | 0 |
| Exit code | 1 |

La ejecución falló. Las ejecuciones anteriores #134/#135 mencionadas en la investigación corrían sobre el SHA padre `90f631...`; no deben considerarse validación del candidato. #136 sí ejecutó `fe8819...`.

## 3. Fallo primario del test BONE-001

Nombre del test:

`BONE-001 locks rapid player combat input during active presentation and reopens after recovery`

Archivo: `tests/combat_presentation_attack_impact.test.mjs`  
Zona del test indicada por el log: alrededor de la línea 837.  
Aserción fallida: línea 897, `assert.ok(firstResolution)`.

Código señalado:

```js
const firstResolution = window.CariCombat.actionButton(breakCard.instanceId);
assert.ok(firstResolution);
```

Valor observado por la prueba: `undefined`.

El test se detiene en esa primera comprobación. No llega a probar el bloqueo de entrada rápida ni la reapertura tras recuperación. Por ello, el fallo **no demuestra por sí solo** que el mecanismo LOCK de producción esté roto o correcto.

## 4. Secuencia y comprobaciones que aparecían en el test

La prueba obtiene la carta `yuri_break_drive` y la carta `yuri_impulso_mach` de la mano real del estado de combate, verifica los botones asociados, añade energía y envuelve con proxies:
- `GameActions.createPlayerSkillAction`;
- `CombatEngine.resolveAction`;
- `RocketBunnyTelemetry.recordCombatAction`.

Luego fija el tiempo en `1000`, llama a `CariCombat.actionButton(breakCard.instanceId)` y espera un resultado truthy. Solo después intenta comprobar contadores de creación/resolución/telemetría, presentación activa, botón deshabilitado y repetición rápida de clics. Esas comprobaciones posteriores no se alcanzaron en la ejecución fallida.

## 5. Otros fallos observados

El job informa además fallos en distintos grupos:
- `phase29=impulso` y el arranque de combate real de Yuri;
- Phase 29-W: BREAK/BURST;
- renderizador de presentación, telegraph, BREAK y BURST;
- slots de motocicleta/personaje de Phase 25;
- perfiles de tomas cinematográficas/cámara de Phase 27;
- actor en espacio de mundo, escena y animación de Phase 28;
- composición/presentación de Phase 29;
- tests 231–235 de `scene_2_5d_vfx.test.mjs`;
- test 243 de `scene_world_space_contract.test.mjs`, con igualdad exacta de punto flotante: `336.00000000000006` frente a `336`.

No se debe asumir que todos estos fallos comparten causa con BONE-001. Las advertencias de deprecación de Node.js 20 y de una futura migración de Ubuntu no fueron identificadas como causa directa del exit code 1.

## 6. Qué se hizo

1. Se revisó el resultado y los logs del workflow #136.
2. Se confirmó el SHA candidato ejecutado por #136.
3. Se aisló el primer fallo de BONE-001: `firstResolution` es `undefined`.
4. Se inspeccionó el test de BONE-001 en `tests/combat_presentation_attack_impact.test.mjs`.
5. La inspección previa del candidato indicó que el commit de candidato afectaba solo ese archivo de test; no se identificaron archivos de producción modificados en ese commit.
6. Se definió la siguiente tarea recomendada como auditoría de solo lectura: `31-BONE-001-FIX-06 — AUDIT FIRST RESOLUTION FAILURE`.
7. En esta sesión se consultó nuevamente el HEAD remoto de la rama candidata.
8. Se creó este documento de continuidad en la rama candidata para registrar lo anterior.

## 7. Qué NO se hizo / qué sigue sin demostrarse

- No se modificó código de producción.
- No se corrigió el test.
- No se ejecutó un nuevo workflow.
- No se crearon commits de código ni se hizo push manual de cambios de código.
- No se fusionó ningún PR.
- No se modificó `main`.
- No se ha identificado la causa raíz de `actionButton(...)` devolviendo `undefined`.
- No se ha determinado si el retorno de `CariCombat.actionButton` debe ser truthy por contrato o si el test supone algo que la función no garantiza.
- No se ha probado el comportamiento real del LOCK en esta ejecución, porque las aserciones de comportamiento no se alcanzaron.
- Los 27 fallos no están resueltos y no todos han sido diagnosticados.
- No se afirma que BONE-001 esté verificado.

## 8. Contrato que se debe preservar

BONE-001 corresponde a **INPUT SPAM / ACTION SYNCHRONIZATION**. El comportamiento previsto es:
- bloquear entradas nuevas durante la presentación activa de una acción;
- evitar que clics rápidos creen o resuelvan acciones adicionales o alteren energía, mano, registros, eventos o telemetría;
- reabrir la entrada después de la recuperación pertinente.

No rediseñar el LOCK sin evidencia y autorización. Primero distinguir entre contrato de retorno, supuesto del test, preparación del harness y defecto real del flujo de runtime.

## 9. Próxima tarea recomendada

### `31-BONE-001-FIX-06 — AUDIT FIRST RESOLUTION FAILURE`

**Modo obligatorio: solo lectura / auditoría. No modificar archivos.**

1. Confirmar el HEAD remoto antes de empezar. Si difiere de `fe8819ce8118274eafb31f56aee37335a5a1509e`, registrar el SHA nuevo y revisar qué cambió.
2. Inspeccionar la implementación de `CariCombat.actionButton` y sus callers relevantes.
3. Determinar si el valor de retorno es parte del contrato público de la función.
4. Seguir el flujo de `yuri_break_drive`: instancia de carta, validación de energía, creación de acción, resolución de `CombatEngine`, actualización de estado y programación de presentación.
5. Verificar estado inicial del harness, carta, energía y presentación.
6. Comparar con el padre `90f631b13e31116b6a51e8b82f8e2cf2276ca882` solo si ayuda a explicar la diferencia.
7. Mantener separados los hallazgos de BONE-001 y los fallos no relacionados.

Formato de informe requerido:

```text
TASK: 31-BONE-001-FIX-06
RESULT: AUDIT_COMPLETE | BLOCKED
VERIFIED_HEAD_SHA:
ACTIONBUTTON_RETURN_CONTRACT:
FIRST_RESOLUTION_FAILURE_CAUSE:
HARNESS_OR_RUNTIME_OR_TEST_ASSUMPTION:
LOCK_IMPLEMENTATION_STATUS:
UNRELATED_FAILURES:
FILES_CHANGED: NONE
COMMITS: NONE (except this documentation commit)
MERGE: NONE
NEXT_MINIMAL_FIX:
```

Si la prueba hace una suposición incorrecta, proponer el cambio mínimo del test y justificarlo. Si existe un defecto de runtime, identificar el camino exacto y la evidencia. No aplicar la corrección sin autorización explícita.

## 10. Restricciones para el próximo chat

- Trabajar solo en `jonhararagi/motowaifus` para esta incidencia; no mezclarlo con `araragijona-coder/vtuber-cari` / Mach-Girls.
- Consultar GitHub y verificar SHA real antes de actuar.
- No modificar `main`.
- No fusionar PR #24.
- No despachar workflows, cambiar código, ni realizar commits de implementación sin autorización explícita.
- Distinguir `VERIFIED`, `NOT VERIFIED`, `HYPOTHESIS` y `PROPOSED`.
- Una ejecución del SHA padre no valida el candidato.
- No declarar BONE-001 resuelto hasta que las aserciones de bloqueo, rechazo de spam y recuperación se ejecuten y pasen en el runtime previsto.

## 11. Punto exacto de reanudación

La pregunta inmediata es:

**¿Por qué `CariCombat.actionButton(breakCard.instanceId)` devuelve `undefined` al intentar resolver `yuri_break_drive`, y ese retorno forma parte del contrato real de la función o es una suposición del test?**

Estado final registrado:

- `BONE-001 = NOT VERIFIED`
- `PRODUCTION FIX = NOT APPLIED`
- `MERGE = NOT DONE`
