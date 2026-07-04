import type { ReactNode } from "react";
import { Callout, StepCard } from "../components/content/Blocks";
import KitchenPortalDemo from "../components/demos/KitchenPortalDemo";

type ArticleBody = { en: ReactNode; es: ReactNode };

export const kitchenArticles: Record<string, ArticleBody> = {
  "kitchen-home": {
    en: (
      <>
        <p>
          Kitchen Portal's home screen shows exactly one thing that needs attention — not a dashboard full of
          numbers. It picks the single most urgent item and puts it front and center.
        </p>
        <KitchenPortalDemo />
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
        <KitchenPortalDemo />
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

  "kitchen-appcc": {
    en: (
      <>
        <p>
          APPCC logs the food-safety checks required for every delivery — reception temperature, condition, and
          batch traceability for each item. This is compliance record-keeping, not optional.
        </p>
        <StepCard number={1} title="Open the batch for the delivery you just received">
          Pending batches are what Home points you to when APPCC registration is needed.
        </StepCard>
        <StepCard number={2} title="Scan instead of typing lot numbers">
          Point the camera at the product's barcode — it reads the lot number and expiry date directly (GS1
          format) instead of you copying digits by hand.
        </StepCard>
        <StepCard number={3} title="Record temperature and condition">
          Enter the reception temperature and mark whether the delivery's condition and appearance passed — these
          are the two go/no-go checks required at reception.
        </StepCard>
        <Callout type="warning" title="Common mistake">
          Skipping the scan and typing "NO_LOTE" out of habit. Only use that when a product genuinely has no lot
          number on it — scanning correctly is what makes traceability actually work if there's ever a recall.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          APPCC registra los controles de seguridad alimentaria obligatorios en cada entrega — temperatura de
          recepción, estado y trazabilidad de lote de cada artículo. Es un registro de cumplimiento normativo, no
          opcional.
        </p>
        <StepCard number={1} title="Abre el lote de la entrega que acabas de recibir">
          Los lotes pendientes son a lo que te dirige Inicio cuando hace falta registrar el APPCC.
        </StepCard>
        <StepCard number={2} title="Escanea en lugar de escribir los números de lote">
          Apunta la cámara al código de barras del producto — lee el número de lote y la fecha de caducidad
          directamente (formato GS1) en lugar de copiar los dígitos a mano.
        </StepCard>
        <StepCard number={3} title="Registra temperatura y estado">
          Introduce la temperatura de recepción y marca si el estado y el aspecto de la entrega son correctos —
          son los dos controles obligatorios en la recepción.
        </StepCard>
        <Callout type="warning" title="Error común">
          Saltarse el escaneo y escribir "NO_LOTE" por costumbre. Úsalo solo cuando un producto realmente no tenga
          número de lote — escanear correctamente es lo que hace que la trazabilidad funcione de verdad si alguna
          vez hay una retirada de producto.
        </Callout>
      </>
    ),
  },

  "kitchen-pedidos": {
    en: (
      <>
        <p>
          Kitchen Orders lets your staff request stock without ever touching your financials or your suppliers'
          contact details. They pick a supplier, build a list, and submit it — and it lands in your approval queue,
          not in the supplier's inbox. It's the kitchen's request slip, not a spending button.
        </p>
        <KitchenPortalDemo />
        <StepCard number={1} title="Pick a supplier">
          Staff see the same suppliers you've set up — Peix Fresc del Port, Distribucions Costa, your produce
          supplier — each showing how orders reach them (WhatsApp, email, or both). No prices, no account numbers.
        </StepCard>
        <StepCard number={2} title="Build the list">
          Each supplier's usual products appear with their typical quantity already filled in, so a cook just taps
          to adjust and add. Need something that isn't listed — a one-off, a special? They add a custom item by name
          and quantity.
        </StepCard>
        <StepCard number={3} title="Submit — it becomes a draft for you">
          Submitting doesn't send anything to the supplier. It creates a draft order that appears in your Pedidos
          tab on the main dashboard, waiting for your approval. You keep the final say on every euro spent.
        </StepCard>
        <Callout type="info" title="Why staff never touch the money">
          The whole point of the login-free portal is that anyone on the line can flag "we're low on octopus" the
          moment they notice — without you handing out passwords or exposing costs. The request flows to you; the
          decision stays with you. Fewer 11pm "we forgot to order" surprises, zero financial exposure.
        </Callout>
        <p className="text-sm text-text-dim">
          Related: <em>Pedidos</em> (main dashboard) — where these kitchen requests arrive for your approval.
        </p>
      </>
    ),
    es: (
      <>
        <p>
          Pedidos de Cocina permite a tu equipo solicitar stock sin tocar nunca tus finanzas ni los datos de
          contacto de tus proveedores. Eligen un proveedor, arman una lista y la envían — y llega a tu cola de
          aprobación, no al buzón del proveedor. Es la nota de pedido de la cocina, no un botón de gasto.
        </p>
        <KitchenPortalDemo />
        <StepCard number={1} title="Elige un proveedor">
          El equipo ve los mismos proveedores que has configurado — Peix Fresc del Port, Distribucions Costa, tu
          proveedor de verdura — cada uno mostrando cómo le llegan los pedidos (WhatsApp, email o ambos). Sin
          precios, sin números de cuenta.
        </StepCard>
        <StepCard number={2} title="Arma la lista">
          Los productos habituales de cada proveedor aparecen con su cantidad típica ya rellenada, así que un
          cocinero solo toca para ajustar y añadir. ¿Falta algo que no está en la lista — algo puntual, un especial?
          Lo añade como artículo personalizado por nombre y cantidad.
        </StepCard>
        <StepCard number={3} title="Envía — se convierte en un borrador para ti">
          Enviar no manda nada al proveedor. Crea un borrador de pedido que aparece en tu pestaña Pedidos del panel
          principal, esperando tu aprobación. Tú mantienes la última palabra sobre cada euro gastado.
        </StepCard>
        <Callout type="info" title="Por qué el equipo nunca toca el dinero">
          El sentido del portal sin login es que cualquiera en la cocina pueda avisar "nos queda poco pulpo" en
          cuanto lo nota — sin que repartas contraseñas ni expongas costes. La solicitud llega a ti; la decisión se
          queda contigo. Menos sorpresas de "se nos olvidó pedir" a las 11 de la noche, cero exposición financiera.
        </Callout>
        <p className="text-sm text-text-dim">
          Relacionado: <em>Pedidos</em> (panel principal) — donde llegan estas solicitudes de cocina para tu
          aprobación.
        </p>
      </>
    ),
  },

  "kitchen-notas": {
    en: (
      <>
        <p>
          Notes is the kitchen's shared memory — two tools in one tab. A running team noticeboard for messages and
          photos, and an agenda calendar for what's coming up. It's where the things that used to live on sticky
          notes and in one person's head become something the whole team can see.
        </p>
        <KitchenPortalDemo />
        <StepCard number={1} title="The noticeboard — messages and photos">
          Anyone can post a note, with or without a photo. A cook snaps the crate of bruised tomatoes that arrived
          so the manager sees it before deciding whether to accept the delivery. A shift leaves a handover: "low on
          clean aprons, laundry comes Thursday." Photos compress automatically, so it's fast even on kitchen wifi.
        </StepCard>
        <StepCard number={2} title="The agenda — what's coming up">
          The calendar holds events the whole team should know about: a large booking Friday, a deep-clean Monday,
          a supplier visit, a staff birthday. Add a title, date, time, and type — it's visible to everyone who opens
          the portal.
        </StepCard>
        <Callout type="tip" title="Why this matters more than it looks">
          A restaurant runs on dozens of small pieces of knowledge that usually live in one person's memory. When
          that person is off, things slip. Notes turns that fragile, personal knowledge into shared, durable
          knowledge — the difference between a kitchen that depends on one manager being present and one that keeps
          running smoothly when they're not.
        </Callout>
        <Callout type="note" title="Login-free, like the rest of the portal">
          Notes lives inside the same token-based Kitchen Portal — no password, no access to your financials. It's
          for the team's day-to-day coordination, kept cleanly separate from the owner's dashboard.
        </Callout>
      </>
    ),
    es: (
      <>
        <p>
          Notas es la memoria compartida de la cocina — dos herramientas en una pestaña. Un tablón de anuncios
          continuo para mensajes y fotos, y una agenda para lo que viene. Es donde las cosas que antes vivían en
          post-its y en la cabeza de una sola persona pasan a estar a la vista de todo el equipo.
        </p>
        <KitchenPortalDemo />
        <StepCard number={1} title="El tablón — mensajes y fotos">
          Cualquiera puede publicar una nota, con o sin foto. Un cocinero fotografía la caja de tomates golpeados que
          llegó para que el encargado lo vea antes de decidir si acepta la entrega. Un turno deja un relevo: "quedan
          pocos delantales limpios, la lavandería viene el jueves". Las fotos se comprimen solas, así que es rápido
          incluso con el wifi de la cocina.
        </StepCard>
        <StepCard number={2} title="La agenda — lo que viene">
          El calendario guarda eventos que todo el equipo debería saber: una reserva grande el viernes, una limpieza
          a fondo el lunes, la visita de un proveedor, el cumpleaños de alguien. Añade título, fecha, hora y tipo —
          queda visible para todos los que abran el portal.
        </StepCard>
        <Callout type="tip" title="Por qué importa más de lo que parece">
          Un restaurante funciona con decenas de pequeños datos que normalmente viven en la memoria de una sola
          persona. Cuando esa persona libra, las cosas se escapan. Notas convierte ese conocimiento frágil y personal
          en conocimiento compartido y duradero — la diferencia entre una cocina que depende de que un encargado esté
          presente y una que sigue funcionando bien cuando no está.
        </Callout>
        <Callout type="note" title="Sin login, como el resto del portal">
          Notas vive dentro del mismo Portal de Cocina basado en token — sin contraseña, sin acceso a tus finanzas.
          Es para la coordinación diaria del equipo, mantenida limpiamente separada del panel del dueño.
        </Callout>
      </>
    ),
  },
};
