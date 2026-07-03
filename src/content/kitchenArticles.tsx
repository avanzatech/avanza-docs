import type { ReactNode } from "react";
import { Callout, StepCard } from "../components/content/Blocks";

type ArticleBody = { en: ReactNode; es: ReactNode };

export const kitchenArticles: Record<string, ArticleBody> = {
  "kitchen-home": {
    en: (
      <>
        <p>
          Kitchen Portal's home screen shows exactly one thing that needs attention — not a dashboard full of
          numbers. It picks the single most urgent item and puts it front and center.
        </p>
        <Callout type="info" title="Priority order">
          It checks in this order: dishes completely out of stock first, then deliveries waiting for APPCC
          registration, then dishes running low, and only shows "all good" once none of those apply.
        </Callout>
        <StepCard number={1} title="Select which dishes to track, once">
          The first time anyone opens the portal, it asks which dishes to watch. This choice is saved to that
          device — it's deliberate, not automatic, because not every dish needs floor-level tracking.
        </StepCard>
        <StepCard number={2} title="Check the card at the top each time you open it">
          That's the one thing to look at. If it says "all good," you don't need to dig further.
        </StepCard>
        <Callout type="tip" title="Business value">
          Kitchen staff get a phone-screen-sized answer to "what needs doing right now" without navigating menus
          during service — the four quick actions below (Board, APPCC, Orders, Notes) cover everything else.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          La pantalla de inicio del Portal de Cocina muestra exactamente una cosa que necesita atención — no un
          panel lleno de cifras. Elige el elemento más urgente y lo pone en primer plano.
        </p>
        <Callout type="info" title="Orden de prioridad">
          Comprueba en este orden: primero los platos completamente sin stock, después las entregas esperando
          registro APPCC, luego los platos con stock bajo, y solo muestra "todo en orden" cuando ninguno aplica.
        </Callout>
        <StepCard number={1} title="Selecciona qué platos seguir, una vez">
          La primera vez que alguien abre el portal, pregunta qué platos vigilar. Esta elección se guarda en ese
          dispositivo — es deliberada, no automática, porque no todos los platos necesitan seguimiento en cocina.
        </StepCard>
        <StepCard number={2} title="Revisa la tarjeta superior cada vez que abras la app">
          Eso es lo único que hay que mirar. Si dice "todo en orden", no hace falta profundizar más.
        </StepCard>
        <Callout type="tip" title="Valor de negocio">
          El personal de cocina obtiene, en el tamaño de un móvil, la respuesta a "qué hace falta hacer ahora" sin
          navegar menús durante el servicio — las cuatro acciones rápidas de abajo (Tablero, APPCC, Pedidos, Notas)
          cubren el resto.
        </Callout>
      </>
    ),
  },

  "kitchen-board": {
    en: (
      <>
        <p>
          The Board shows stock status for the dishes selected on Home — not every dish, only the ones chosen for
          tracking.
        </p>
        <StepCard number={1} title="Add or remove dishes from tracking">
          The Board opens in editing mode the first time, or whenever nothing's selected yet. Choose only what's
          actually worth watching — a short list gets checked; a long one gets ignored.
        </StepCard>
        <StepCard number={2} title="Read the status colors">
          Red means out of stock, amber means below the low-stock threshold. Both feed directly into what Home
          shows as the day's priority.
        </StepCard>
        <Callout type="warning" title="Common mistake">
          Selecting every dish "to be safe." The Board is only useful if it's short enough to glance at during
          service — treat it as a watchlist, not a full menu inventory.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          El Tablero muestra el estado de stock de los platos seleccionados en Inicio — no todos los platos, solo
          los elegidos para seguimiento.
        </p>
        <StepCard number={1} title="Añade o quita platos del seguimiento">
          El Tablero se abre en modo edición la primera vez, o siempre que no haya nada seleccionado. Elige solo lo
          que realmente merece la pena vigilar — una lista corta se revisa; una larga se ignora.
        </StepCard>
        <StepCard number={2} title="Interpreta los colores de estado">
          Rojo significa sin stock, ámbar significa por debajo del umbral de stock bajo. Ambos alimentan
          directamente lo que Inicio muestra como prioridad del día.
        </StepCard>
        <Callout type="warning" title="Error común">
          Seleccionar todos los platos "por si acaso". El Tablero solo es útil si es lo bastante corto para
          revisarlo de un vistazo durante el servicio — trátalo como una lista de vigilancia, no un inventario
          completo del menú.
        </Callout>
      </>
    ),
  },
};
