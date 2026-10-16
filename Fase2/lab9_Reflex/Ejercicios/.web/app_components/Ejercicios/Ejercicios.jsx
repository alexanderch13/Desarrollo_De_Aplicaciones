
import {ReflexEvent,applyEventActions,isTrue,mergeSlotProps} from "$/utils/state"
import {StateContexts,addEvents} from "$/utils/context"
import {Fragment,memo,useCallback,useContext,useEffect} from "react"
import {jsx} from "@emotion/react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Text as RadixThemesText} from "@radix-ui/themes"








export const Bare_comp_40417d07f307c326bf553bd693dd3ebc_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_40417d07f307c326bf553bd693dd3ebc_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        reflex___state____state__ejercicios____ejercicios____estado_kanban.total_tareas_rx_state_
    )
});
Bare_comp_40417d07f307c326bf553bd693dd3ebc_a29c98e0.displayName = "Bare";
return Bare_comp_40417d07f307c326bf553bd693dd3ebc_a29c98e0;
})();

export const Bare_comp_b6382d71dea36ec6cc7d5b2a429a05dc_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_b6382d71dea36ec6cc7d5b2a429a05dc_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        reflex___state____state__ejercicios____ejercicios____estado_kanban.total_pendientes_rx_state_
    )
});
Bare_comp_b6382d71dea36ec6cc7d5b2a429a05dc_a29c98e0.displayName = "Bare";
return Bare_comp_b6382d71dea36ec6cc7d5b2a429a05dc_a29c98e0;
})();

export const Bare_comp_ac319734abfba0f4703db1878ff13fbd_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_ac319734abfba0f4703db1878ff13fbd_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        reflex___state____state__ejercicios____ejercicios____estado_kanban.total_en_progreso_rx_state_
    )
});
Bare_comp_ac319734abfba0f4703db1878ff13fbd_a29c98e0.displayName = "Bare";
return Bare_comp_ac319734abfba0f4703db1878ff13fbd_a29c98e0;
})();

export const Bare_comp_f5b03d539de8a71c5b281af76953f6c8_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_f5b03d539de8a71c5b281af76953f6c8_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        reflex___state____state__ejercicios____ejercicios____estado_kanban.total_completadas_rx_state_
    )
});
Bare_comp_f5b03d539de8a71c5b281af76953f6c8_a29c98e0.displayName = "Bare";
return Bare_comp_f5b03d539de8a71c5b281af76953f6c8_a29c98e0;
})();

export const Bare_comp_c504efa9898db50453f4a0a3fe262ae6_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_c504efa9898db50453f4a0a3fe262ae6_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        reflex___state____state__ejercicios____ejercicios____estado_kanban.porcentaje_completadas_rx_state_
    )
});
Bare_comp_c504efa9898db50453f4a0a3fe262ae6_a29c98e0.displayName = "Bare";
return Bare_comp_c504efa9898db50453f4a0a3fe262ae6_a29c98e0;
})();

export const Bare_comp_9eb64099958a18394c1fc8d84114e2df_a29c98e0 = /*#__PURE__*/ (() => {
const Bare_comp_9eb64099958a18394c1fc8d84114e2df_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        (reflex___state____state__ejercicios____ejercicios____estado_kanban.mostrar_solo_pendientes_rx_state_ ? "Mostrar todas las tareas" : "Mostrar solo pendientes")
    )
});
Bare_comp_9eb64099958a18394c1fc8d84114e2df_a29c98e0.displayName = "Bare";
return Bare_comp_9eb64099958a18394c1fc8d84114e2df_a29c98e0;
})();

export const Button_button_ee7ca2694861c47005ad0c1d48dd20ea_a29c98e0 = /*#__PURE__*/ (() => {
const Button_button_ee7ca2694861c47005ad0c1d48dd20ea_a29c98e0 = memo(({children, ...rest}) => {
    const on_click_be1f829c0f93b6c1b1e91d0f70069d5b = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.ejercicios____ejercicios____estado_kanban.toggle_filtro", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])



    return(
        jsx(RadixThemesButton,{...mergeSlotProps(rest, ({ color:"purple", onClick:on_click_be1f829c0f93b6c1b1e91d0f70069d5b, size:"3" }))},children)
    )
});
Button_button_ee7ca2694861c47005ad0c1d48dd20ea_a29c98e0.displayName = "Button";
return Button_button_ee7ca2694861c47005ad0c1d48dd20ea_a29c98e0;
})();

export const Cond_comp_9b59f5d9b0ef3b1df910fa2eda206638_a29c98e0 = /*#__PURE__*/ (() => {
const Cond_comp_9b59f5d9b0ef3b1df910fa2eda206638_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        ((reflex___state____state__ejercicios____ejercicios____estado_kanban.tareas_visibles_rx_state_.length?.valueOf?.() === 0?.valueOf?.())?(children?.at?.(0)):(children?.at?.(1)))
    )
});
Cond_comp_9b59f5d9b0ef3b1df910fa2eda206638_a29c98e0.displayName = "Cond";
return Cond_comp_9b59f5d9b0ef3b1df910fa2eda206638_a29c98e0;
})();

export const Foreach_comp_6f1e5caf2dc053d6d0e0a2da8fc34e3f_a29c98e0 = /*#__PURE__*/ (() => {
const Foreach_comp_6f1e5caf2dc053d6d0e0a2da8fc34e3f_a29c98e0 = memo(({children}) => {
    const reflex___state____state__ejercicios____ejercicios____estado_kanban = useContext(StateContexts.reflex___state____state__ejercicios____ejercicios____estado_kanban)



    return(
        Array.prototype.map.call(reflex___state____state__ejercicios____ejercicios____estado_kanban.tareas_visibles_rx_state_ ?? [],((t_rx_state_,index_564b98ecc039685a6012917cf616dc5c)=>(jsx(RadixThemesBox,{css:({ ["padding"] : "15px", ["border"] : ("2px solid "+(() => { switch (JSON.stringify(t_rx_state_?.["estado"])) {case JSON.stringify("Pendiente"):  return ("#FFC107");  break;case JSON.stringify("En progreso"):  return ("#2196F3");  break;case JSON.stringify("Completada"):  return ("#4CAF50");  break;default:  return ("#E0E0E0");  break;};})()), ["borderRadius"] : "8px", ["backgroundColor"] : "#FFFFFF", ["boxShadow"] : "0 2px 6px #00000010", ["width"] : "100%", ["marginBottom"] : "10px" }),key:index_564b98ecc039685a6012917cf616dc5c},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["alignItems"] : "start" }),direction:"column",gap:"2"},jsx(RadixThemesHeading,{size:"4"},t_rx_state_?.["titulo"]),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#4B5563" }),size:"2"},t_rx_state_?.["descripcion"]),jsx(RadixThemesBadge,{color:"gray",variant:"soft"},t_rx_state_?.["estado"]),jsx(RadixThemesButton,{color:"blue",css:({ ["marginTop"] : "2" }),onClick:((_e) => (addEvents([(ReflexEvent("reflex___state____state.ejercicios____ejercicios____estado_kanban.cambiar_estado", ({ ["id_tarea"] : t_rx_state_?.["id"] }), ({  })))], [_e], ({  })))),size:"1"},"Cambiar estado"))))))
    )
});
Foreach_comp_6f1e5caf2dc053d6d0e0a2da8fc34e3f_a29c98e0.displayName = "Foreach";
return Foreach_comp_6f1e5caf2dc053d6d0e0a2da8fc34e3f_a29c98e0;
})();
