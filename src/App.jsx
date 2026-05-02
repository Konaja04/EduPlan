import React, { useState } from 'react';

import { Calendar, Users, BookOpen, AlertCircle, CheckCircle2, UserCheck, Sun, Sunset, Moon, FileSpreadsheet, Power, X, Trash2, Info, Download, Plus, History, UserPlus, UploadCloud, Save, FileBarChart, Clock } from 'lucide-react';

 

// --- DATOS INICIALES ---

const PERFILES = ['Tributación', 'Auditoría', 'Finanzas', 'Costos', 'Contabilidad Básica'];

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const TURNOS = ['Mañana', 'Tarde', 'Noche'];

 

const HORARIOS = {

 'Mañana': ['07:30 am - 12:00 m'],

 'Tarde': ['01:30 pm - 06:00 pm'],

 'Noche': ['06:10 pm - 10:30 pm']

};

 

const DOCENTES_INICIALES = [

 { id: 1, nombre: 'Dr. Juan Pérez', dni: '12345678', tipoDocente: 'DTC', categoriaDocente: 'Regular', cursosHabilitados: [101, 105], disponibilidad: ['Lunes-Mañana', 'Lunes-Noche', 'Miércoles-Mañana', 'Viernes-Mañana'], tieneFichaSunedu: true },

 { id: 2, nombre: 'Mg. María Gómez', dni: '87654321', tipoDocente: 'DTP', categoriaDocente: 'Tiempo Parcial', cursosHabilitados: [102, 106], disponibilidad: ['Martes-Tarde', 'Jueves-Tarde', 'Sábado-Tarde'], tieneFichaSunedu: false },

];

 

const CURSOS_INICIALES = [

 { id: 101, codigoCurso: 'C101', nombre: 'Impuesto a la Renta', horas: 4, ciclo: 'V', perfilRequerido: 'Tributación', malla: 'Malla D-V10', activo: true },

 { id: 102, codigoCurso: 'C102', nombre: 'Auditoría Financiera', horas: 5, ciclo: 'VII', perfilRequerido: 'Auditoría', malla: 'Malla D-V10', activo: true },

 { id: 106, codigoCurso: 'C106', nombre: 'Auditoría Forense', horas: 4, ciclo: 'VII', perfilRequerido: 'Auditoría', malla: 'Malla E-V10', activo: true },

 { id: 103, codigoCurso: 'C103', nombre: 'Contabilidad de Costos I', horas: 5, ciclo: 'IV', perfilRequerido: 'Costos', malla: 'Malla D-V10', activo: true },

 { id: 104, codigoCurso: 'C104', nombre: 'Finanzas Corporativas', horas: 4, ciclo: 'VI', perfilRequerido: 'Finanzas', malla: 'Malla E-V10', activo: true },

 { id: 105, codigoCurso: 'C105', nombre: 'Tributación Municipal', horas: 3, ciclo: 'VIII', perfilRequerido: 'Tributación', malla: 'Malla E-V10', activo: false },

];

 

const CONFIG_SECCIONES_INICIAL = {

 101: { 'Mañana': 1, 'Tarde': 0, 'Noche': 1 },

 102: { 'Mañana': 0, 'Tarde': 1, 'Noche': 0 },

 103: { 'Mañana': 1, 'Tarde': 1, 'Noche': 0 },

 104: { 'Mañana': 0, 'Tarde': 0, 'Noche': 1 },

};

 

const DATOS_PERIODO_VACIO = {

 cursos: [], docentes: [], configSecciones: {}, asignaciones: {}

};

 

export default function App() {

 const [activeTab, setActiveTab] = useState('programacion');

 

 // --- SISTEMA MULTI-PERIODO ---

 const [periodos, setPeriodos] = useState(['2026-I', '2026-II']);

 const [periodoActual, setPeriodoActual] = useState('2026-II');

 

 const [db, setDb] = useState({

   '2026-I': {

     cursos: CURSOS_INICIALES.map(c => ({...c, activo: c.ciclo === 'IV'})),

     docentes: DOCENTES_INICIALES,

     configSecciones: { 103: { 'Mañana': 2, 'Tarde': 0, 'Noche': 0 } },

     asignaciones: {}

   },

   '2026-II': {

     cursos: CURSOS_INICIALES,

     docentes: DOCENTES_INICIALES,

     configSecciones: CONFIG_SECCIONES_INICIAL,

     asignaciones: {}

   }

 });

 

 const [modalNuevoPeriodo, setModalNuevoPeriodo] = useState({ isOpen: false, nombre: '', clonarDatos: true });

 const [modalNotificacion, setModalNotificacion] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });

 const [isImportModalOpen, setIsImportModalOpen] = useState(false);

 const [importText, setImportText] = useState('');

 const [importError, setImportError] = useState('');

 

 const datosActivos = db[periodoActual] || DATOS_PERIODO_VACIO;

 const cursos = datosActivos.cursos;

 const docentes = datosActivos.docentes;

 const configSecciones = datosActivos.configSecciones;

 const asignaciones = datosActivos.asignaciones;

 

 // Actualizadores de estado

 const setCursos = (updater) => setDb(prev => ({ ...prev, [periodoActual]: { ...(prev[periodoActual] || DATOS_PERIODO_VACIO), cursos: typeof updater === 'function' ? updater((prev[periodoActual] || DATOS_PERIODO_VACIO).cursos) : updater } }));

 const setDocentes = (updater) => setDb(prev => ({ ...prev, [periodoActual]: { ...(prev[periodoActual] || DATOS_PERIODO_VACIO), docentes: typeof updater === 'function' ? updater((prev[periodoActual] || DATOS_PERIODO_VACIO).docentes) : updater } }));

 const setConfigSecciones = (updater) => setDb(prev => ({ ...prev, [periodoActual]: { ...(prev[periodoActual] || DATOS_PERIODO_VACIO), configSecciones: typeof updater === 'function' ? updater((prev[periodoActual] || DATOS_PERIODO_VACIO).configSecciones) : updater } }));

 const setAsignaciones = (updater) => setDb(prev => ({ ...prev, [periodoActual]: { ...(prev[periodoActual] || DATOS_PERIODO_VACIO), asignaciones: typeof updater === 'function' ? updater((prev[periodoActual] || DATOS_PERIODO_VACIO).asignaciones) : updater } }));

 

 // --- FORMULARIO DOCENTE ---

 const [formDocente, setFormDocente] = useState({

   apellidosNombres: '', dni: '', genero: '', celular: '',

   correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '',

   tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null

 });

 

 const mallasUnicas = [...new Set(cursos.map(c => c.malla))];

 

 const handleDocenteCheckbox = (campo, valor) => setFormDocente(prev => ({ ...prev, [campo]: prev[campo].includes(valor) ? prev[campo].filter(i => i !== valor) : [...prev[campo], valor] }));

 const handleDisponibilidadToggle = (dia, turno) => {

   const val = `${dia}-${turno}`;

   setFormDocente(prev => ({ ...prev, disponibilidad: prev.disponibilidad.includes(val) ? prev.disponibilidad.filter(i => i !== val) : [...prev.disponibilidad, val] }));

 };

 

 const guardarDocente = (e) => {

   e.preventDefault();

   if (!formDocente.apellidosNombres || !formDocente.dni || formDocente.cursosHabilitados.length === 0 || formDocente.disponibilidad.length === 0) {

     alert("Por favor completa los campos obligatorios, selecciona al menos un curso y un bloque de disponibilidad."); return;

   }

   const nuevoDocente = {

     id: Date.now(), nombre: formDocente.apellidosNombres, dni: formDocente.dni, genero: formDocente.genero,

     celular: formDocente.celular, correoCorp: formDocente.correoCorp, correoPers: formDocente.correoPers,

     idTrilce: formDocente.idTrilce, fechaNac: formDocente.fechaNac, tipoDocente: formDocente.tipoDocente,

     categoriaDocente: formDocente.tipoDocente === 'DTP' ? 'Tiempo Parcial' : formDocente.categoriaDocente,

     cursosHabilitados: formDocente.cursosHabilitados, disponibilidad: formDocente.disponibilidad, tieneFichaSunedu: !!formDocente.archivoSunedu

   };

   setDocentes(prev => [...prev, nuevoDocente]);

   setFormDocente({ apellidosNombres: '', dni: '', genero: '', celular: '', correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '', tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null });

   setModalNotificacion({ isOpen: true, type: 'info', title: '¡Registro Exitoso!', message: 'La ficha del docente ha sido recibida.', onConfirm: null });

 };

 

 // --- LÓGICA MALLA Y SECCIONES ---

 const [filtroMalla, setFiltroMalla] = useState('Todas');

 const mallasDisponibles = ['Todas', ...mallasUnicas];

 const cursosFiltrados = filtroMalla === 'Todas' ? cursos : cursos.filter(c => c.malla === filtroMalla);

 

 const procesarImportacion = () => {

   if (!importText.trim()) { setImportError('Por favor pega algunos datos primero.'); return; }

   try {

     const filas = importText.trim().split('\n');

     const nuevosCursos = [];

     let duplicados = 0;

 

     filas.forEach((fila, index) => {

       const col = fila.split('\t');

       if (col.length >= 6) {

         const cod = col[1].trim(); const malla = col[5].trim();

         const existe = cursos.some(c => c.codigoCurso === cod && c.malla === malla) || nuevosCursos.some(c => c.codigoCurso === cod && c.malla === malla);

         if (existe) duplicados++;

         else {

           nuevosCursos.push({

             id: cod ? `${cod}-${Date.now()}-${index}` : Date.now() + index,

             ciclo: col[0].trim(), codigoCurso: cod, nombre: col[2].trim(),

             horas: parseInt(col[3].trim()) || 0, // EXTRACCIÓN ESTRICTA DE HORAS LECTIVAS

             creditos: col[4].trim(), malla: malla, perfilRequerido: 'Por definir', activo: true

           });

         }

       }

     });

     if (nuevosCursos.length > 0 || duplicados > 0) {

       if (nuevosCursos.length > 0) setCursos(prev => [...prev, ...nuevosCursos]);

       setIsImportModalOpen(false); setImportText(''); setImportError('');

       setModalNotificacion({ isOpen: true, type: 'info', title: 'Importación Completada', message: `${nuevosCursos.length} cursos importados. ${duplicados > 0 ? `Se omitieron ${duplicados} duplicados.` : ''}`, onConfirm: null });

     } else { setImportError('Formato incorrecto.'); }

   } catch (e) { setImportError('Error al procesar.'); }

 };

 

 const handleConfigChange = (cursoId, turno, cant) => {

   setConfigSecciones(prev => ({ ...prev, [cursoId]: { ...(prev[cursoId] || { 'Mañana': 0, 'Tarde': 0, 'Noche': 0 }), [turno]: Math.max(0, parseInt(cant) || 0) } }));

 };

 const toggleCursoActivo = (cursoId) => setCursos(prev => prev.map(c => c.id === cursoId ? { ...c, activo: !c.activo } : c));

 const eliminarCurso = (cursoId) => {

   setCursos(prev => prev.filter(c => c.id !== cursoId));

   setConfigSecciones(prev => { const n = { ...prev }; delete n[cursoId]; return n; });

   setAsignaciones(prev => { const n = { ...prev }; Object.keys(n).forEach(k => { if (k.startsWith(`${cursoId}-`)) delete n[k]; }); return n; });

   setModalNotificacion({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });

 };

 

 const seccionesGeneradas = [];

 cursos.filter(c => c.activo).forEach(curso => {

   const config = configSecciones[curso.id] || { 'Mañana': 0, 'Tarde': 0, 'Noche': 0 };

   for (let i = 1; i <= config['Mañana']; i++) seccionesGeneradas.push({ ...curso, seccionId: `${curso.id}-A${i}`, codigo: `A${i}`, turno: 'Mañana' });

   for (let i = 1; i <= config['Tarde']; i++) seccionesGeneradas.push({ ...curso, seccionId: `${curso.id}-B${i}`, codigo: `B${i}`, turno: 'Tarde' });

   for (let i = 1; i <= config['Noche']; i++) seccionesGeneradas.push({ ...curso, seccionId: `${curso.id}-C${i}`, codigo: `C${i}`, turno: 'Noche' });

 });

 

 // --- LÓGICA DE ASIGNACIÓN Y CARGA LECTIVA ---

 const handleAsignacion = (seccionId, campo, valor) => {

   setAsignaciones(prev => {

     const asig = prev[seccionId] || {};

     const nueva = { ...asig, [campo]: valor };

     

     if (campo === 'docenteId' && valor !== '') {

       const docenteSeleccionado = docentes.find(d => d.id === parseInt(valor));

       const seccionAfectada = seccionesGeneradas.find(s => s.seccionId === seccionId);

       if (docenteSeleccionado && asig.dia && seccionAfectada) {

         if (!docenteSeleccionado.disponibilidad.includes(`${asig.dia}-${seccionAfectada.turno}`)) nueva.dia = '';

       }

       if (docenteSeleccionado && asig.horario) nueva.horario = '';

     }

 

     if (nueva.docenteId && nueva.dia && nueva.horario) {

       let hayCruce = false;

       for (const [idAsigExt, asigExt] of Object.entries(prev)) {

         if (idAsigExt !== seccionId && asigExt.docenteId === nueva.docenteId && asigExt.dia === nueva.dia && asigExt.horario === nueva.horario) {

           hayCruce = true; break;

         }

       }

       if (hayCruce) {

         setModalNotificacion({ isOpen: true, type: 'info', title: 'Cruce Detectado', message: 'El docente ya tiene una clase en ese día y bloque horario. Se deshizo la selección.', onConfirm: null });

         nueva.horario = '';

       }

     }

     return { ...prev, [seccionId]: nueva };

   });

 };

 

 const getLimitesCarga = (tipo, categoria) => {

   if (tipo === 'DTP') return { min: 0, max: 15, texto: 'Max 15h' };

   if (categoria === 'Nacional') return { min: 0, max: 20, texto: 'Max 20h' };

   if (categoria === 'Apoyo Escuela' || categoria === 'Apoyo SUBE') return { min: 0, max: 25, texto: 'Max 25h' };

   return { min: 28, max: 33, texto: '28h - 33h' };

 };

 

 const exportarCargaLectivaExcel = () => {

   const escapeXml = (unsafe) => unsafe ? unsafe.toString().replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] || c)) : '';

   let xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="H"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/></Style><Style ss:ID="C"><Alignment ss:Horizontal="Center"/></Style><Style ss:ID="Exc"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#991B1B"/><Interior ss:Color="#FEE2E2" ss:Pattern="Solid"/></Style><Style ss:ID="Fal"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#B45309"/><Interior ss:Color="#FEF3C7" ss:Pattern="Solid"/></Style><Style ss:ID="Cum"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#166534"/><Interior ss:Color="#DCFCE7" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="Carga Lectiva"><Table><Row><Cell ss:StyleID="H"><Data ss:Type="String">DOCENTE</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">TIPO</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CATEGORÍA</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">SECCIONES ASIGNADAS</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">HORAS LECTIVAS TOTALES</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">RANGO PERMITIDO</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">ESTADO CARGA</Data></Cell></Row>`;

   

   docentes.forEach(d => {

     let totalSec = 0; let totalHrs = 0;

     Object.entries(asignaciones).forEach(([secId, asig]) => {

       if (parseInt(asig.docenteId) === d.id && asig.dia && asig.horario) {

         totalSec++;

         const curso = cursos.find(c => c.id === parseInt(secId.split('-')[0]));

         // EXTRACCIÓN DIRECTA DE LAS HORAS LECTIVAS DE LA MALLA

         if (curso) totalHrs += (parseInt(curso.horas) || 0);

       }

     });

     const lim = getLimitesCarga(d.tipoDocente, d.categoriaDocente);

     let est = 'CUMPLE'; let styl = 'Cum';

     if (totalHrs > lim.max) { est = 'EXCEDE LÍMITE'; styl = 'Exc'; } else if (totalHrs < lim.min) { est = 'FALTAN HORAS'; styl = 'Fal'; }

     xml += `<Row><Cell><Data ss:Type="String">${escapeXml(d.nombre)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tipoDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.categoriaDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="Number">${totalSec}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="Number">${totalHrs}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(lim.texto)}</Data></Cell><Cell ss:StyleID="${styl}"><Data ss:Type="String">${escapeXml(est)}</Data></Cell></Row>`;

   });

   xml += `</Table></Worksheet></Workbook>`;

   const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); link.download = `Reporte_Carga_Lectiva_${periodoActual}.xls`; document.body.appendChild(link); link.click(); document.body.removeChild(link);

 };

 

 const exportarDocentesExcel = () => {

   if (docentes.length === 0) return;

   const escapeXml = (unsafe) => unsafe ? unsafe.toString().replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] || c)) : '';

   let xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="H"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/></Style><Style ss:ID="C"><Alignment ss:Horizontal="Center"/></Style></Styles><Worksheet ss:Name="Plana Docente"><Table><Row><Cell ss:StyleID="H"><Data ss:Type="String">APELLIDOS Y NOMBRES</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">DNI</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CELULAR</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CORREO CORPORATIVO</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">TIPO DOCENTE</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CATEGORÍA DTC</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">ESTADO PDF</Data></Cell></Row>`;

   docentes.forEach(d => { xml += `<Row><Cell><Data ss:Type="String">${escapeXml(d.nombre)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.dni)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.celular)}</Data></Cell><Cell><Data ss:Type="String">${escapeXml(d.correoCorp)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tipoDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.categoriaDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tieneFichaSunedu ? 'Cargado' : 'Pendiente')}</Data></Cell></Row>`; });

   xml += `</Table></Worksheet></Workbook>`;

   const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); link.download = `Reporte_Plana_Docente_${periodoActual}.xls`; document.body.appendChild(link); link.click(); document.body.removeChild(link);

 };

 

 // --- NUEVA FUNCIÓN: Exportar Horario General (Sábana de Horarios) ---

 const exportarHorarioGeneral = () => {

   // 1. Agrupar la data por cohorte (Malla, Ciclo, Seccion, Turno)

   const grupos = {};

   

   seccionesGeneradas.forEach(seccion => {

     // Creamos un ID único para la fila del Excel (ej: Malla D-V10 | IV | A1 | Mañana)

     const keyFila = `${seccion.malla}|${seccion.ciclo}|${seccion.codigo}|${seccion.turno}`;

     

     if (!grupos[keyFila]) {

       grupos[keyFila] = {

         malla: seccion.malla,

         ciclo: seccion.ciclo,

         seccion: seccion.codigo,

         turno: seccion.turno.charAt(0), // 'M', 'T', 'N'

         horario: { 'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': [], 'Sábado': [] }

       };

     }

 

     const asig = asignaciones[seccion.seccionId];

     if (asig && asig.dia && asig.docenteId) {

       const docente = docentes.find(d => d.id === parseInt(asig.docenteId));

       const nombreDocente = docente ? docente.nombre : 'Por Asignar';

       // Agregamos "CURSO \n DOCENTE" al día correspondiente

       grupos[keyFila].horario[asig.dia].push(`${seccion.nombre}\n${nombreDocente}`);

     }

   });

 

   // 2. Ordenar las filas (Por Malla -> Ciclo -> Sección)

   const filas = Object.values(grupos).sort((a, b) => {

     if (a.malla !== b.malla) return a.malla.localeCompare(b.malla);

     if (a.ciclo !== b.ciclo) return a.ciclo.localeCompare(b.ciclo);

     return a.seccion.localeCompare(b.seccion);

   });

 

   if (filas.length === 0) {

     setModalNotificacion({ isOpen: true, type: 'info', title: 'Reporte Vacío', message: 'No hay datos en la malla para generar el horario.', onConfirm: null });

     return;

   }

 

   const escapeXml = (unsafe) => unsafe ? unsafe.toString().replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] || c)) : '';

 

   // 3. Construir el Excel con estilos multilinea (WrapText)

   let xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>

<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">

<Styles>

 <Style ss:ID="Header"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/></Style>

 <Style ss:ID="Center"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>

 <Style ss:ID="WrapText"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/></Style>

</Styles>

<Worksheet ss:Name="Horario General">

 <Table>

  <Column ss:Width="80"/><Column ss:Width="60"/><Column ss:Width="60"/><Column ss:Width="50"/>

  <Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/>

  <Row ss:Height="20">

   <Cell ss:StyleID="Header"><Data ss:Type="String">PLAN</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">CICLO</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">SECCIÓN</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">TURNO</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">LUNES</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">MARTES</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">MIÉRCOLES</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">JUEVES</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">VIERNES</Data></Cell>

   <Cell ss:StyleID="Header"><Data ss:Type="String">SÁBADO</Data></Cell>

  </Row>`;

 

   filas.forEach(f => {

     // FIX: Escapamos los caracteres XML primero, y luego reemplazamos el \n plano por &#10; que es el salto de línea de Excel

     const getData = (dia) => {

       if (f.horario[dia].length === 0) return '';

       const texto = f.horario[dia].join('\n\n');

       return escapeXml(texto).replace(/\n/g, '&#10;');

     };

     

     xml += `

  <Row ss:AutoFitHeight="1">

   <Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.malla)}</Data></Cell>

   <Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.ciclo)}</Data></Cell>

   <Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.seccion)}</Data></Cell>

   <Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.turno)}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Lunes')}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Martes')}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Miércoles')}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Jueves')}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Viernes')}</Data></Cell>

   <Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Sábado')}</Data></Cell>

  </Row>`;

   });

 

   xml += `</Table></Worksheet></Workbook>`;

 

   const link = document.createElement("a");

   link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' }));

   link.download = `Reporte_Horario_General_${periodoActual}.xls`;

   document.body.appendChild(link);

   link.click();

   document.body.removeChild(link);

 };

 

 const crearNuevoPeriodo = () => {

   const nuevoNombre = modalNuevoPeriodo.nombre.trim();

   if (!nuevoNombre || periodos.includes(nuevoNombre)) return;

   const nuevosDatos = { ...DATOS_PERIODO_VACIO };

   if (modalNuevoPeriodo.clonarDatos) { nuevosDatos.cursos = [...cursos]; nuevosDatos.docentes = [...docentes]; }

   setDb(prev => ({ ...prev, [nuevoNombre]: nuevosDatos })); setPeriodos(prev => [...prev, nuevoNombre]); setPeriodoActual(nuevoNombre); setModalNuevoPeriodo({ isOpen: false, nombre: '', clonarDatos: true });

 };

 

 return (

   <div className="min-h-screen bg-slate-100 text-slate-800 font-sans relative pb-10">

     <header className="bg-blue-900 text-white shadow-md relative z-20">

       <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">

         <div><h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-7 h-7 text-blue-300" /> EduPlan: Contabilidad</h1></div>

         <div className="bg-blue-950/50 p-2 rounded-xl flex items-center gap-3 border border-blue-800">

           <span className="text-xs font-bold text-blue-200 uppercase">Periodo:</span>

           <select value={periodoActual} onChange={(e) => setPeriodoActual(e.target.value)} className="bg-blue-800 text-white border border-blue-700 text-sm font-bold rounded-lg p-2 outline-none">

             {periodos.map(p => <option key={p} value={p}>{p}</option>)}

           </select>

           <div className="w-px h-6 bg-blue-800 mx-1"></div>

           <button onClick={() => setModalNuevoPeriodo({ ...modalNuevoPeriodo, isOpen: true })} className="bg-blue-700 hover:bg-blue-600 text-white p-2 rounded-lg flex items-center gap-1 text-xs font-bold"><Plus className="w-4 h-4" /> Nuevo</button>

         </div>

       </div>

     </header>

 

     <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">

       <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto">

         <button onClick={() => setActiveTab('portal-docente')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'portal-docente' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><UserPlus className="w-5 h-5" /> Portal Docente</button>

         <div className="w-px h-6 bg-slate-300 my-auto mx-2"></div>

         <button onClick={() => setActiveTab('cursos')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'cursos' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><BookOpen className="w-5 h-5" /> Malla Curricular</button>

         <button onClick={() => setActiveTab('docentes')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'docentes' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><Users className="w-5 h-5" /> Plana Docente</button>

         <button onClick={() => setActiveTab('programacion')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'programacion' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><Calendar className="w-5 h-5" /> Programación de Horarios</button>

       </div>

     </nav>

 

     <main className="max-w-6xl mx-auto px-4 py-8">

       

       {/* VISTA: PORTAL DOCENTE */}

       {activeTab === 'portal-docente' && (

         <div className="max-w-4xl mx-auto">

           <div className="bg-indigo-900 text-white p-8 rounded-t-2xl shadow-lg relative overflow-hidden">

             <div className="relative z-10">

               <h2 className="text-3xl font-bold mb-2">Ficha de Actualización Docente</h2>

               <p className="text-indigo-200">Periodo Académico {periodoActual} • Facultad de Contabilidad</p>

             </div>

             <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4"><UserPlus className="w-64 h-64" /></div>

           </div>

           <form onSubmit={guardarDocente} className="bg-white rounded-b-2xl shadow-lg border border-slate-200 p-8 space-y-8">

             <section>

               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> Datos Personales y Contacto</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                 <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Apellidos y Nombres *</label><input required type="text" value={formDocente.apellidosNombres} onChange={e => setFormDocente({...formDocente, apellidosNombres: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>

                 <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">DNI / Carnet Ext. *</label><input required type="text" value={formDocente.dni} onChange={e => setFormDocente({...formDocente, dni: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>

                 <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Celular</label><input type="tel" value={formDocente.celular} onChange={e => setFormDocente({...formDocente, celular: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>

                 <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Correo Corporativo</label><input type="email" value={formDocente.correoCorp} onChange={e => setFormDocente({...formDocente, correoCorp: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>

               </div>

             </section>

 

             <section>

               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> Perfil Académico y Cursos</h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">

                 <div>

                   <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tipo de Docente</label>

                   <div className="flex gap-4">

                     <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${formDocente.tipoDocente === 'DTP' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><input type="radio" value="DTP" checked={formDocente.tipoDocente === 'DTP'} onChange={() => setFormDocente({...formDocente, tipoDocente: 'DTP'})} className="hidden" /><span className={`block font-bold ${formDocente.tipoDocente === 'DTP' ? 'text-indigo-700' : 'text-slate-600'}`}>DTP</span><span className="text-[10px] text-slate-500 block mt-1">Tiempo Parcial (Max 15h)</span></label>

                     <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${formDocente.tipoDocente === 'DTC' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><input type="radio" value="DTC" checked={formDocente.tipoDocente === 'DTC'} onChange={() => setFormDocente({...formDocente, tipoDocente: 'DTC'})} className="hidden" /><span className={`block font-bold ${formDocente.tipoDocente === 'DTC' ? 'text-indigo-700' : 'text-slate-600'}`}>DTC</span><span className="text-[10px] text-slate-500 block mt-1">Tiempo Completo</span></label>

                   </div>

                   {formDocente.tipoDocente === 'DTC' && (

                     <div className="mt-4"><label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Categoría del Tiempo Completo</label><select value={formDocente.categoriaDocente} onChange={(e) => setFormDocente({...formDocente, categoriaDocente: e.target.value})} className="w-full p-2.5 border-2 border-indigo-200 rounded-lg bg-indigo-50/50 text-indigo-900 text-sm outline-none font-medium"><option value="Regular">DTC Regular / Otros (28 - 33 hrs)</option><option value="Nacional">Docente Nacional (Max 20 hrs)</option><option value="Apoyo Escuela">Apoyo en Escuela (Max 25 hrs)</option><option value="Apoyo SUBE">Apoyo SUBE (Max 25 hrs)</option></select></div>

                   )}

                 </div>

                 <div>

                   <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ficha SUNEDU (PDF)</label>

                   <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 bg-slate-50 text-center hover:bg-slate-100 cursor-pointer relative">

                     <input type="file" accept=".pdf" onChange={(e) => setFormDocente({...formDocente, archivoSunedu: e.target.files[0] ? e.target.files[0].name : null})} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

                     <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" /><span className="text-sm text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis px-2 block">{formDocente.archivoSunedu ? formDocente.archivoSunedu : "Subir PDF de SUNEDU"}</span>

                   </div>

                 </div>

               </div>

 

               <div className="space-y-4">

                 <label className="block text-sm font-bold text-slate-700">Seleccione los cursos (Malla Activa):</label>

                 {mallasUnicas.map(malla => {

                   const cursosMalla = cursos.filter(c => c.malla === malla);

                   if (cursosMalla.length === 0) return null;

                   return (

                     <div key={malla} className="bg-slate-50 border border-slate-200 rounded-xl p-4">

                       <h4 className="font-bold text-indigo-800 text-sm mb-3 uppercase tracking-wider">{malla}</h4>

                       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">

                         {cursosMalla.map(curso => (

                           <label key={curso.id} className={`flex items-start gap-2 p-2 rounded border cursor-pointer transition-colors ${formDocente.cursosHabilitados.includes(curso.id) ? 'bg-indigo-100 border-indigo-300' : 'bg-white border-slate-200'}`}>

                             <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded" checked={formDocente.cursosHabilitados.includes(curso.id)} onChange={() => handleDocenteCheckbox('cursosHabilitados', curso.id)} />

                             <div>

                               <span className="block text-sm font-medium text-slate-800 leading-tight">{curso.nombre}</span>

                               <span className="block text-[10px] text-slate-500">{curso.horas} Horas Lectivas • Ciclo {curso.ciclo}</span>

                             </div>

                           </label>

                         ))}

                       </div>

                     </div>

                   );

                 })}

               </div>

             </section>

 

             <section>

               <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span> Disponibilidad (Matriz Día-Turno)</h3>

               <div className="overflow-hidden rounded-xl border border-slate-200">

                 <table className="w-full text-left bg-white">

                   <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-600 font-bold">

                     <tr><th className="p-3">Día</th>{TURNOS.map(turno => <th key={turno} className="p-3 text-center">{turno}</th>)}</tr>

                   </thead>

                   <tbody className="divide-y divide-slate-100">

                     {DIAS.map(dia => (

                       <tr key={dia} className="hover:bg-slate-50">

                         <td className="p-3 font-medium text-slate-700">{dia}</td>

                         {TURNOS.map(turno => {

                           const isSelected = formDocente.disponibilidad.includes(`${dia}-${turno}`);

                           return (<td key={turno} className="p-3 text-center"><button type="button" onClick={() => handleDisponibilidadToggle(dia, turno)} className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors ${isSelected ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-400 hover:bg-indigo-200'}`}>{isSelected ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current opacity-40"></div>}</button></td>);

                         })}

                       </tr>

                     ))}

                   </tbody>

                 </table>

               </div>

             </section>

             <div className="pt-6 border-t border-slate-200 flex justify-end"><button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-indigo-200"><Save className="w-6 h-6" /> Enviar Ficha</button></div>

           </form>

         </div>

       )}

 

       {/* VISTA: MALLA CURRICULAR Y SECCIONES (RESTAURADA COMPLETA) */}

       {activeTab === 'cursos' && (

         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

           <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">

             <div>

               <h2 className="text-xl font-bold text-slate-800">Gestión de Mallas y Secciones</h2>

               <p className="text-slate-500 text-sm mt-1">Activa los cursos que se dictarán este periodo y define sus secciones.</p>

             </div>

             <div className="flex flex-wrap gap-3">

               <select value={filtroMalla} onChange={(e) => setFiltroMalla(e.target.value)} className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5">

                 {mallasDisponibles.map(m => <option key={m} value={m}>{m}</option>)}

               </select>

               <button onClick={() => setIsImportModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><FileSpreadsheet className="w-4 h-4" /> Importar Sheets</button>

             </div>

           </div>

 

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-slate-50">

             {cursosFiltrados.map(curso => {

               const config = configSecciones[curso.id] || { 'Mañana': 0, 'Tarde': 0, 'Noche': 0 };

               const isActivo = curso.activo;

               return (

                 <div key={curso.id} className={`bg-white p-5 rounded-xl border transition-all shadow-sm flex flex-col justify-between ${isActivo ? 'border-blue-200' : 'border-slate-200 opacity-75 grayscale-[0.5]'}`}>

                   <div>

                     <div className="flex justify-between items-start mb-2">

                       <div className="flex items-center gap-2 flex-wrap">

                         <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">CICLO {curso.ciclo}</span>

                         <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{curso.malla}</span>

                         <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded flex items-center gap-1"><Clock className="w-3 h-3"/> {curso.horas} Hrs Lectivas</span>

                       </div>

                       <div className="flex items-center gap-2">

                         <button onClick={() => toggleCursoActivo(curso.id)} className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full ${isActivo ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}><Power className="w-3 h-3" /> {isActivo ? 'DICTANDO' : 'NO DICTAR'}</button>

                         <button onClick={() => setModalNotificacion({isOpen: true, type: 'confirm', title: 'Eliminar Curso', message: `¿Eliminar "${curso.nombre}" y sus secciones?`, onConfirm: () => eliminarCurso(curso.id)})} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 className="w-4 h-4" /></button>

                       </div>

                     </div>

                     <h3 className={`font-bold text-lg mb-2 ${isActivo ? 'text-slate-800' : 'text-slate-500 line-through'}`}>{curso.nombre}</h3>

                     <div className="bg-slate-50 p-2 rounded-lg flex items-center gap-2 mb-4 border border-slate-100">

                       <UserCheck className="w-4 h-4 text-slate-400" /><span className="text-xs text-slate-500 font-semibold uppercase">Perfil req:</span><span className="text-sm font-medium text-slate-700">{curso.perfilRequerido}</span>

                     </div>

                   </div>

                   {isActivo ? (

                     <div className="border-t border-slate-100 pt-4 mt-auto">

                       <p className="text-xs font-bold text-slate-800 mb-3 uppercase">Cantidad de Secciones</p>

                       <div className="grid grid-cols-3 gap-3">

                         <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-amber-600 uppercase flex items-center gap-1"><Sun className="w-3 h-3"/> Mañana (A)</label><input type="number" min="0" value={config['Mañana']} onChange={(e) => handleConfigChange(curso.id, 'Mañana', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium"/></div>

                         <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-orange-600 uppercase flex items-center gap-1"><Sunset className="w-3 h-3"/> Tarde (B)</label><input type="number" min="0" value={config['Tarde']} onChange={(e) => handleConfigChange(curso.id, 'Tarde', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium"/></div>

                         <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-indigo-600 uppercase flex items-center gap-1"><Moon className="w-3 h-3"/> Noche (C)</label><input type="number" min="0" value={config['Noche']} onChange={(e) => handleConfigChange(curso.id, 'Noche', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium"/></div>

                       </div>

                     </div>

                   ) : (<div className="border-t border-slate-100 pt-4 mt-auto text-center"><p className="text-sm text-slate-400 italic">Curso inactivo.</p></div>)}

                 </div>

               );

             })}

           </div>

         </div>

       )}

 

       {/* VISTA: PLANA DOCENTE */}

       {activeTab === 'docentes' && (

         <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

           <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

             <div><h2 className="text-xl font-bold text-slate-800">Plana Docente - Periodo {periodoActual}</h2></div>

             <button onClick={exportarDocentesExcel} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><Download className="w-4 h-4" /> Exportar Datos Personales</button>

           </div>

           <div className="overflow-x-auto p-6 text-center text-slate-500">

             <p>Ve a "Portal Docente" para agregar profesores, y descarga el Excel para ver su data administrativa.</p>

           </div>

         </div>

       )}

 

       {/* VISTA: PROGRAMACIÓN */}

       {activeTab === 'programacion' && (

         <div className="space-y-6">

           <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">

             <div>

               <h2 className="text-xl font-bold text-slate-800">Asignación de Carga Lectiva</h2>

               <div className="text-sm mt-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium inline-block">

                 {Object.keys(asignaciones).filter(k => asignaciones[k].docenteId && asignaciones[k].dia && asignaciones[k].horario).length} de {seccionesGeneradas.length} secciones

               </div>

             </div>

             <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

               <button onClick={exportarHorarioGeneral} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md justify-center transition-colors">

                 <Calendar className="w-5 h-5" /> Horario General

               </button>

               <button onClick={exportarCargaLectivaExcel} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md justify-center transition-colors">

                 <FileBarChart className="w-5 h-5" /> Carga Lectiva

               </button>

             </div>

           </div>

 

           <div className="grid gap-6">

             {seccionesGeneradas.map(seccion => {

               const asignacion = asignaciones[seccion.seccionId] || { docenteId: '', dia: '', horario: '' };

               const isCompleto = asignacion.docenteId && asignacion.dia && asignacion.horario;

               const docentesRecomendados = docentes.filter(d => d.cursosHabilitados && d.cursosHabilitados.includes(seccion.id));

               const otrosDocentes = docentes.filter(d => !d.cursosHabilitados || !d.cursosHabilitados.includes(seccion.id));

               const docenteSeleccionado = docentes.find(d => d.id === parseInt(asignacion.docenteId));

               const disponibilidadDocente = docenteSeleccionado ? (docenteSeleccionado.disponibilidad || []) : [];

               const horariosDelTurno = HORARIOS[seccion.turno] || [];

 

               return (

                 <div key={seccion.seccionId} className={`bg-white rounded-xl shadow-sm border-l-4 p-5 flex flex-col md:flex-row gap-6 transition-all ${isCompleto ? 'border-green-500' : 'border-slate-300'}`}>

                   <div className="md:w-1/3 space-y-2">

                     <div className="flex items-center gap-2 flex-wrap">

                       <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${seccion.turno === 'Mañana' ? 'bg-amber-100 text-amber-700' : seccion.turno === 'Tarde' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'}`}>Sección {seccion.codigo}</span>

                       <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded flex items-center gap-1"><Clock className="w-3 h-3"/> {seccion.horas} Horas Lectivas</span>

                       {isCompleto && <CheckCircle2 className="w-5 h-5 text-green-500" />}

                     </div>

                     <h3 className="text-lg font-bold text-slate-800">{seccion.nombre}</h3>

                   </div>

 

                   <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">

                     <div className="space-y-1">

                       <label className="text-xs font-semibold text-slate-500 uppercase">Docente</label>

                       <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none" value={asignacion.docenteId} onChange={(e) => handleAsignacion(seccion.seccionId, 'docenteId', e.target.value)}>

                         <option value="">Seleccionar...</option>

                         <optgroup label="✨ Habilitados">{docentesRecomendados.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}</optgroup>

                         <optgroup label="Otros">{otrosDocentes.map(d => <option key={d.id} value={d.id}>{d.nombre}</option>)}</optgroup>

                       </select>

                     </div>

                     <div className="space-y-1">

                       <label className="text-xs font-semibold text-slate-500 uppercase">Día</label>

                       <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none disabled:opacity-50" value={asignacion.dia} onChange={(e) => handleAsignacion(seccion.seccionId, 'dia', e.target.value)} disabled={!asignacion.docenteId}>

                         <option value="">Seleccionar...</option>

                         {DIAS.map(dia => {

                           const disponible = !docenteSeleccionado || disponibilidadDocente.includes(`${dia}-${seccion.turno}`);

                           return disponible ? <option key={dia} value={dia}>{dia}</option> : null;

                         })}

                       </select>

                     </div>

                     <div className="space-y-1">

                       <label className="text-xs font-semibold text-slate-500 uppercase">Horario ({seccion.turno})</label>

                       <select className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm outline-none disabled:opacity-50" value={asignacion.horario} onChange={(e) => handleAsignacion(seccion.seccionId, 'horario', e.target.value)} disabled={!asignacion.dia}>

                         <option value="">Seleccionar...</option>

                         {horariosDelTurno.map(hora => <option key={hora} value={hora}>{hora}</option>)}

                       </select>

                     </div>

                   </div>

                 </div>

               );

             })}

           </div>

         </div>

       )}

     </main>

 

     {/* MODAL DE IMPORTACIÓN */}

     {isImportModalOpen && (

       <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">

         <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">

           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">

             <h3 className="font-bold text-slate-800 flex items-center gap-2"><FileSpreadsheet className="text-emerald-600 w-5 h-5"/> Importar Malla Curricular</h3>

             <button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>

           </div>

           <div className="p-6 overflow-y-auto">

             <p className="text-sm text-slate-600 mb-4">Copia las filas de tu Excel y pégalas. Asegúrate del orden exacto (Se extraerán las Horas Lectivas automáticamente de la Columna 4):</p>

             <div className="bg-slate-100 p-3 rounded-lg flex gap-4 text-xs font-mono text-slate-700 mb-4 overflow-x-auto border border-slate-200">

               <span className="font-bold">CICLO</span> | <span className="font-bold">CÓDIGO</span> | <span className="font-bold">EXPERIENCIAS CURRICULARES</span> | <span className="font-bold text-purple-700">HORAS (LECTIVAS)</span> | <span className="font-bold">CRÉDITOS</span> | <span className="font-bold">MALLA</span>

             </div>

             <textarea className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono whitespace-pre" placeholder="Ejemplo:&#10;III&#9;CON301&#9;Contabilidad de Costos&#9;4&#9;3&#9;Malla 2024" value={importText} onChange={(e) => setImportText(e.target.value)}></textarea>

             {importError && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {importError}</p>}

           </div>

           <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">

             <button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button>

             <button onClick={procesarImportacion} className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">Procesar e Importar</button>

           </div>

         </div>

       </div>

     )}

 

     {/* MODALES DE ALERTAS Y PERIODO */}

     {modalNuevoPeriodo.isOpen && (

       <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[70]">

         <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">

           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50"><h3 className="font-bold text-slate-800 flex items-center gap-2"><Plus className="text-blue-600 w-5 h-5"/> Aperturar Nuevo Periodo</h3><button onClick={() => setModalNuevoPeriodo({ ...modalNuevoPeriodo, isOpen: false })} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button></div>

           <div className="p-6 space-y-4">

             <div><label className="block text-sm font-bold text-slate-700 mb-1">Nombre del Periodo</label><input type="text" value={modalNuevoPeriodo.nombre} onChange={(e) => setModalNuevoPeriodo({...modalNuevoPeriodo, nombre: e.target.value.toUpperCase()})} placeholder="Ej: 2027-I" className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium" /></div>

             <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg"><label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" checked={modalNuevoPeriodo.clonarDatos} onChange={(e) => setModalNuevoPeriodo({...modalNuevoPeriodo, clonarDatos: e.target.checked})} className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer" /><div><span className="block text-sm font-bold text-slate-800">Clonar datos del periodo actual ({periodoActual})</span><span className="block text-xs text-slate-600 mt-1">Copia la Malla y Docentes. Las secciones y horarios comenzarán vacíos.</span></div></label></div>

           </div>

           <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3"><button onClick={() => setModalNuevoPeriodo({ ...modalNuevoPeriodo, isOpen: false })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button><button onClick={crearNuevoPeriodo} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Crear Periodo</button></div>

         </div>

       </div>

     )}

 

     {modalNotificacion.isOpen && (

       <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">

         <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">

           <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">{modalNotificacion.type === 'confirm' ? <AlertCircle className="text-amber-500 w-6 h-6" /> : <Info className="text-blue-500 w-6 h-6" />}<h3 className="font-bold text-slate-800 text-lg">{modalNotificacion.title}</h3></div>

           <div className="p-6 text-slate-600">{modalNotificacion.message}</div>

           <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">

             {modalNotificacion.type === 'confirm' ? (<><button onClick={() => setModalNotificacion({ ...modalNotificacion, isOpen: false })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button><button onClick={modalNotificacion.onConfirm} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg">Confirmar</button></>) : (<button onClick={() => setModalNotificacion({ ...modalNotificacion, isOpen: false })} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Entendido</button>)}

           </div>

         </div>

       </div>

     )}

   </div>

 );

}