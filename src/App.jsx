import React, { useState } from 'react';
import { Calendar, Users, BookOpen, AlertCircle, CheckCircle2, UserCheck, Sun, Sunset, Moon, FileSpreadsheet, Power, X, Trash2, Info, Download, Plus, History, UserPlus, UploadCloud, Save, FileBarChart, Clock, Filter, LogIn, LogOut, MapPin, Lock, User, Edit, List, LayoutGrid } from 'lucide-react';

// --- DATOS INICIALES ---
const CAMPUS_LIST = ['Ate', 'Callao', 'Lima Este', 'Lima Norte', 'Trujillo', 'Piura', 'Chiclayo', 'Chimbote', 'Huaraz', 'Chepen', 'Tarapoto', 'Moyobamba', 'Lima Centro', 'Distancia'];
const PERFILES = ['Tributación', 'Auditoría', 'Finanzas', 'Costos', 'Contabilidad Básica'];
const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const TURNOS = ['Mañana', 'Tarde', 'Noche'];

const HORARIOS = {
  'Mañana': ['07:30 am - 12:00 m'],
  'Tarde': ['01:30 pm - 06:00 pm'],
  'Noche': ['06:10 pm - 10:30 pm']
};

// Datos reales extraídos de la sábana del PDF
const DOCENTES_INICIALES = [
  { id: 1, nombre: 'CHUQUILLANQUI VILCHEZ FREDDY', dni: '11111111', tipoDocente: 'DTC', categoriaDocente: 'Regular', cursosHabilitados: [102, 126], disponibilidad: ['Lunes-Mañana', 'Lunes-Noche', 'Martes-Mañana', 'Miércoles-Mañana', 'Jueves-Mañana', 'Viernes-Noche'], tieneFichaSunedu: true, fechaRegistro: Date.now() },
  { id: 2, nombre: 'VENTURA DE ESQUEN MARINA', dni: '22222222', tipoDocente: 'DTP', categoriaDocente: 'Tiempo Parcial', cursosHabilitados: [104, 110, 115], disponibilidad: ['Martes-Mañana', 'Jueves-Noche', 'Viernes-Noche'], tieneFichaSunedu: true, fechaRegistro: Date.now() },
  { id: 3, nombre: 'MENDIBURU ROJAS JAIME', dni: '33333333', tipoDocente: 'DTP', categoriaDocente: 'Tiempo Parcial', cursosHabilitados: [113, 119, 123], disponibilidad: ['Lunes-Noche', 'Martes-Noche', 'Jueves-Noche'], tieneFichaSunedu: false, fechaRegistro: Date.now() },
  { id: 4, nombre: 'MASIAS MUÑOZ BETTY', dni: '44444444', tipoDocente: 'DTC', categoriaDocente: 'Coordinador', cursosHabilitados: [110, 117], disponibilidad: ['Lunes-Mañana', 'Miércoles-Noche', 'Viernes-Noche'], tieneFichaSunedu: true, fechaRegistro: Date.now() },
  { id: 5, nombre: 'YZAGUIRRE RUIZ MARCO', dni: '55555555', tipoDocente: 'DTP', categoriaDocente: 'Tiempo Parcial', cursosHabilitados: [105], disponibilidad: ['Sábado-Mañana'], tieneFichaSunedu: true, fechaRegistro: Date.now() - (73 * 60 * 60 * 1000) } // Expirado (más de 72h)
];

const CURSOS_INICIALES = [
  { id: 101, codigoCurso: 'E-01', nombre: 'Pensamiento Lógico', horas: 4, ciclo: 'I', perfilRequerido: 'Básica', malla: 'E-V02', activo: true },
  { id: 102, codigoCurso: 'E-02', nombre: 'Fundamentos de Contabilidad', horas: 5, ciclo: 'I', perfilRequerido: 'Básica', malla: 'E-V02', activo: true },
  { id: 103, codigoCurso: 'E-03', nombre: 'Habilidades Comunicativas', horas: 4, ciclo: 'I', perfilRequerido: 'Básica', malla: 'E-V02', activo: true },
  { id: 104, codigoCurso: 'D-04', nombre: 'Contabilidad Empresarial', horas: 4, ciclo: 'II', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: true },
  { id: 105, codigoCurso: 'D-05', nombre: 'Comercio Internacional', horas: 3, ciclo: 'III', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: false },
  { id: 106, codigoCurso: 'D-06', nombre: 'Costos y Presupuestos', horas: 5, ciclo: 'IV', perfilRequerido: 'Costos', malla: 'D-V09', activo: false },
  { id: 107, codigoCurso: 'D-07', nombre: 'Contabilidad Superior', horas: 4, ciclo: 'IV', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: false },
  { id: 108, codigoCurso: 'D-08', nombre: 'Economía', horas: 3, ciclo: 'V', perfilRequerido: 'Básica', malla: 'D-V09', activo: true },
  { id: 109, codigoCurso: 'D-09', nombre: 'Administración', horas: 3, ciclo: 'V', perfilRequerido: 'Básica', malla: 'D-V09', activo: true },
  { id: 110, codigoCurso: 'D-10', nombre: 'Tributación', horas: 4, ciclo: 'V', perfilRequerido: 'Tributación', malla: 'D-V09', activo: true },
  { id: 111, codigoCurso: 'D-11', nombre: 'Normas Contables', horas: 4, ciclo: 'V', perfilRequerido: 'Auditoría', malla: 'D-V09', activo: true },
  { id: 112, codigoCurso: 'D-12', nombre: 'Renta Personal y Empresarial', horas: 4, ciclo: 'VI', perfilRequerido: 'Tributación', malla: 'D-V09', activo: false },
  { id: 113, codigoCurso: 'D-13', nombre: 'Financial Analysis For Decision Making', horas: 4, ciclo: 'VI', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: true },
  { id: 114, codigoCurso: 'D-14', nombre: 'Cambio Climático y Gestión de Riesgos', horas: 3, ciclo: 'VI', perfilRequerido: 'Básica', malla: 'D-V09', activo: false },
  { id: 115, codigoCurso: 'D-15', nombre: 'Desarrollo de Competencias Gerenciales', horas: 3, ciclo: 'VI', perfilRequerido: 'Básica', malla: 'D-V09', activo: false },
  { id: 116, codigoCurso: 'D-16', nombre: 'Control Interno Gerencial', horas: 4, ciclo: 'VII', perfilRequerido: 'Auditoría', malla: 'D-V09', activo: true },
  { id: 117, codigoCurso: 'D-17', nombre: 'Planeamiento Tributario', horas: 4, ciclo: 'VII', perfilRequerido: 'Tributación', malla: 'D-V09', activo: true },
  { id: 118, codigoCurso: 'D-18', nombre: 'Laboratorio de Negocios', horas: 4, ciclo: 'VII', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: false },
  { id: 119, codigoCurso: 'D-19', nombre: 'Management Accounting', horas: 4, ciclo: 'VII', perfilRequerido: 'Costos', malla: 'D-V09', activo: true },
  { id: 120, codigoCurso: 'D-20', nombre: 'Auditoría Financiera', horas: 5, ciclo: 'VII', perfilRequerido: 'Auditoría', malla: 'D-V09', activo: true },
  { id: 121, codigoCurso: 'D-21', nombre: 'Tributación Internacional', horas: 4, ciclo: 'VII', perfilRequerido: 'Tributación', malla: 'D-V09', activo: true },
  { id: 122, codigoCurso: 'D-22', nombre: 'Gerencia y Prospectiva Estratégica', horas: 4, ciclo: 'VIII', perfilRequerido: 'Básica', malla: 'D-V09', activo: false },
  { id: 123, codigoCurso: 'D-23', nombre: 'Strategic Financial Planning', horas: 4, ciclo: 'VIII', perfilRequerido: 'Finanzas', malla: 'D-V09', activo: false },
  { id: 124, codigoCurso: 'D-24', nombre: 'Gestión de Proyectos', horas: 4, ciclo: 'VIII', perfilRequerido: 'Básica', malla: 'D-V09', activo: false },
  { id: 125, codigoCurso: 'D-25', nombre: 'Auditoría Integral', horas: 5, ciclo: 'VIII', perfilRequerido: 'Auditoría', malla: 'D-V09', activo: false },
  { id: 126, codigoCurso: 'D-26', nombre: 'Prácticas Pre Profesional Terminal I', horas: 6, ciclo: 'IX', perfilRequerido: 'Básica', malla: 'D-V09', activo: false },
];

const CONFIG_SECCIONES_INICIAL = {
  101: { 'Mañana': 1, 'Tarde': 0, 'Noche': 2 },
  102: { 'Mañana': 1, 'Tarde': 0, 'Noche': 2 },
  103: { 'Mañana': 1, 'Tarde': 0, 'Noche': 2 },
  104: { 'Mañana': 1, 'Tarde': 1, 'Noche': 1 },
};

const DATOS_PERIODO_VACIO = {
  cursos: [], docentes: [], configSecciones: {}, asignaciones: {}
};

export default function App() {
  // ============================================================================
  // 1. ESTADOS (HOOKS)
  // ============================================================================
  
  const [auth, setAuth] = useState(null); 
  const [activeCampus, setActiveCampus] = useState(''); 
  const [loginData, setLoginData] = useState({ rol: 'Coordinador', campus: 'Lima Norte', dni: '' });

  const [activeTab, setActiveTab] = useState('catalogo'); 
  const [periodos, setPeriodos] = useState(['2026-I', '2026-II']);
  const [periodoActual, setPeriodoActual] = useState('2026-II');
  
  const [db, setDb] = useState(() => {
    const initialDb = {};
    CAMPUS_LIST.forEach(camp => {
      initialDb[`${camp}-2026-II`] = { cursos: CURSOS_INICIALES, docentes: DOCENTES_INICIALES, configSecciones: CONFIG_SECCIONES_INICIAL, asignaciones: {} };
    });
    return initialDb;
  });

  const [modalNuevoPeriodo, setModalNuevoPeriodo] = useState({ isOpen: false, nombre: '', clonarDatos: true });
  const [modalNotificacion, setModalNotificacion] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importError, setImportError] = useState('');
  
  const [filtroProgTurno, setFiltroProgTurno] = useState('Todos');
  const [filtroProgEstado, setFiltroProgEstado] = useState('Todos');
  const [filtroProgCiclo, setFiltroProgCiclo] = useState('Todos');
  
  const [filtroMalla, setFiltroMalla] = useState('Todas');
  const [filtroCiclo, setFiltroCiclo] = useState('Todos');
  const [modalEditarCurso, setModalEditarCurso] = useState({ isOpen: false, curso: null });

  const [formDocente, setFormDocente] = useState({
    apellidosNombres: '', dni: '', genero: '', celular: '',
    correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '',
    tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null
  });
  const [portalMalla, setPortalMalla] = useState('');
  const [portalCiclo, setPortalCiclo] = useState('');

  // ============================================================================
  // 2. LÓGICA DERIVADA (DB y Control de Acceso)
  // ============================================================================
  const dbKey = `${activeCampus}-${periodoActual}`;
  const datosActivos = db[dbKey] || DATOS_PERIODO_VACIO;
  
  const cursos = datosActivos.cursos;
  const docentes = datosActivos.docentes;
  const configSecciones = datosActivos.configSecciones;
  const asignaciones = datosActivos.asignaciones;

  // Lógica de Bloqueo para el Coordinador
  const homeDbKey = auth ? `${auth.campus}-${periodoActual}` : '';
  const isProfileComplete = auth ? (db[homeDbKey]?.docentes.some(d => d.dni === auth.dni) || false) : false;
  const canAccessAdmin = auth && auth.rol === 'Coordinador' && isProfileComplete;

  const mallasUnicas = [...new Set(cursos.map(c => c.malla))];
  const mallasDisponibles = ['Todas', ...mallasUnicas];
  
  const ROMAN_VALS = { 'I':1, 'II':2, 'III':3, 'IV':4, 'V':5, 'VI':6, 'VII':7, 'VIII':8, 'IX':9, 'X':10 };
  const ciclosDisponibles = ['Todos', ...new Set(cursos.filter(c => filtroMalla === 'Todas' || c.malla === filtroMalla).map(c => c.ciclo))].sort((a,b) => {
    if (a === 'Todos') return -1;
    if (b === 'Todos') return 1;
    return (ROMAN_VALS[a] || 99) - (ROMAN_VALS[b] || 99);
  });

  const cursosFiltrados = cursos.filter(c => {
    if (filtroMalla !== 'Todas' && c.malla !== filtroMalla) return false;
    if (filtroCiclo !== 'Todos' && c.ciclo !== filtroCiclo) return false;
    return true;
  });

  const cursosActivosFiltrados = cursosFiltrados.filter(c => c.activo);

  const setCursos = (updater) => setDb(prev => ({ ...prev, [dbKey]: { ...(prev[dbKey] || DATOS_PERIODO_VACIO), cursos: typeof updater === 'function' ? updater((prev[dbKey] || DATOS_PERIODO_VACIO).cursos) : updater } }));
  const setDocentes = (updater) => setDb(prev => ({ ...prev, [dbKey]: { ...(prev[dbKey] || DATOS_PERIODO_VACIO), docentes: typeof updater === 'function' ? updater((prev[dbKey] || DATOS_PERIODO_VACIO).docentes) : updater } }));
  const setConfigSecciones = (updater) => setDb(prev => ({ ...prev, [dbKey]: { ...(prev[dbKey] || DATOS_PERIODO_VACIO), configSecciones: typeof updater === 'function' ? updater((prev[dbKey] || DATOS_PERIODO_VACIO).configSecciones) : updater } }));
  const setAsignaciones = (updater) => setDb(prev => ({ ...prev, [dbKey]: { ...(prev[dbKey] || DATOS_PERIODO_VACIO), asignaciones: typeof updater === 'function' ? updater((prev[dbKey] || DATOS_PERIODO_VACIO).asignaciones) : updater } }));

  // ============================================================================
  // 3. FUNCIONES DE NEGOCIO
  // ============================================================================
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.dni.trim()) { alert("Debe ingresar su DNI."); return; }
    
    setAuth({ rol: loginData.rol, campus: loginData.campus, dni: loginData.dni });
    setActiveCampus(loginData.campus);
    
    const targetDbKey = `${loginData.campus}-${periodoActual}`;
    const targetDocentes = db[targetDbKey]?.docentes || [];
    const isComplete = targetDocentes.some(d => d.dni === loginData.dni);
    const docenteExistente = targetDocentes.find(d => d.dni === loginData.dni);

    if (loginData.rol === 'Coordinador' && isComplete) {
      setActiveTab('catalogo');
    } else {
      setActiveTab('portal-docente');
    }

    if (docenteExistente) {
      const horasTranscurridas = (Date.now() - docenteExistente.fechaRegistro) / (1000 * 60 * 60);
      
      if (horasTranscurridas <= 72) {
        setFormDocente({
          apellidosNombres: docenteExistente.nombre, dni: docenteExistente.dni, genero: docenteExistente.genero || '',
          celular: docenteExistente.celular || '', correoCorp: docenteExistente.correoCorp || '', correoPers: docenteExistente.correoPers || '',
          idTrilce: docenteExistente.idTrilce || '', fechaNac: docenteExistente.fechaNac || '', tipoDocente: docenteExistente.tipoDocente,
          categoriaDocente: docenteExistente.categoriaDocente, cursosHabilitados: docenteExistente.cursosHabilitados || [],
          disponibilidad: docenteExistente.disponibilidad || [], archivoSunedu: docenteExistente.tieneFichaSunedu ? 'Ficha_Cargada.pdf' : null
        });
        if (loginData.rol === 'Docente' || !isComplete) {
          setModalNotificacion({ isOpen: true, type: 'info', title: 'Modo Edición Habilitado', message: `Hemos recuperado sus datos. Tiene hasta 72 horas desde su último envío para modificarlos.`, onConfirm: null });
        }
      } else {
        setFormDocente({
          apellidosNombres: '', dni: loginData.dni, genero: '', celular: '', correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '', tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null
        });
        if (loginData.rol === 'Docente' || !isComplete) {
          setModalNotificacion({ isOpen: true, type: 'info', title: 'Tiempo Expirado', message: 'Han pasado más de 72 horas desde su último registro. Debe volver a ingresar todos sus datos.', onConfirm: null });
        }
      }
    } else {
      setFormDocente({
        apellidosNombres: '', dni: loginData.dni, genero: '', celular: '', correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '', tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null
      });
    }
  };

  const handleLogout = () => {
    setAuth(null);
    setLoginData({ ...loginData, dni: '' });
  };

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

    const docenteExistente = docentes.find(d => d.dni === formDocente.dni);
    
    const nuevoDocente = {
      id: docenteExistente ? docenteExistente.id : Date.now(), 
      nombre: formDocente.apellidosNombres, dni: formDocente.dni, genero: formDocente.genero,
      celular: formDocente.celular, correoCorp: formDocente.correoCorp, correoPers: formDocente.correoPers,
      idTrilce: formDocente.idTrilce, fechaNac: formDocente.fechaNac, tipoDocente: formDocente.tipoDocente,
      categoriaDocente: formDocente.tipoDocente === 'DTP' ? 'Tiempo Parcial' : formDocente.categoriaDocente,
      cursosHabilitados: formDocente.cursosHabilitados, disponibilidad: formDocente.disponibilidad, 
      tieneFichaSunedu: !!formDocente.archivoSunedu,
      fechaRegistro: Date.now() 
    };
    
    setDocentes(prev => {
      const filtrado = prev.filter(d => d.dni !== formDocente.dni);
      return [...filtrado, nuevoDocente];
    });
    
    if (auth.dni !== formDocente.dni) {
      setFormDocente({ apellidosNombres: '', dni: '', genero: '', celular: '', correoCorp: '', correoPers: '', idTrilce: '', fechaNac: '', tipoDocente: 'DTP', categoriaDocente: 'Regular', cursosHabilitados: [], disponibilidad: [], archivoSunedu: null });
      setModalNotificacion({ isOpen: true, type: 'info', title: '¡Registro Exitoso!', message: `El docente ha sido registrado en la Plana Docente del campus ${activeCampus}.`, onConfirm: null });
    } else {
      setModalNotificacion({ isOpen: true, type: 'info', title: '¡Ficha Actualizada!', message: `Sus datos han sido guardados correctamente. Tiene 72 horas desde este momento para realizar nuevas modificaciones.`, onConfirm: null });
    }
  };

  const confirmarEliminarDocente = (docente) => {
    setModalNotificacion({
      isOpen: true, type: 'confirm', title: 'Eliminar Docente',
      message: `¿Estás seguro de eliminar al docente ${docente.nombre}? Si estaba asignado a algún horario, dicha asignación quedará en blanco.`,
      onConfirm: () => {
        setDocentes(prev => prev.filter(d => d.id !== docente.id));
        setAsignaciones(prev => {
          const nuevas = { ...prev };
          Object.keys(nuevas).forEach(key => {
            if (parseInt(nuevas[key].docenteId) === docente.id) nuevas[key] = { ...nuevas[key], docenteId: '', dia: '', horario: '' };
          });
          return nuevas;
        });
        setModalNotificacion({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
      }
    });
  };

  const procesarImportacion = () => {
    if (!importText.trim()) { setImportError('Por favor pega algunos datos primero.'); return; }
    try {
      const filas = importText.trim().split('\n');
      const nuevosCursos = [];
      let duplicados = 0;

      filas.forEach((fila, index) => {
        const col = fila.split('\t').map(c => c ? c.trim() : '');
        if (col.length >= 3 && col[2]) {
          const ciclo = col[0] || 'I';
          const cod = col[1] || `SC-${Date.now().toString().slice(-4)}-${index}`; 
          const nombre = col[2];
          const horas = parseInt(col[3]) || 4; 
          const creditos = col[4] || '3';
          const malla = col[5] || 'Malla General';

          const existe = cursos.some(c => c.codigoCurso === cod && c.malla === malla) || nuevosCursos.some(c => c.codigoCurso === cod && c.malla === malla);
          
          if (existe) {
            duplicados++;
          } else {
            nuevosCursos.push({
              id: `${cod}-${Date.now()}-${index}`,
              ciclo: ciclo.toUpperCase(), codigoCurso: cod, nombre: nombre,
              horas: horas, creditos: creditos, malla: malla, perfilRequerido: 'Por definir', activo: false 
            });
          }
        }
      });
      if (nuevosCursos.length > 0 || duplicados > 0) {
        if (nuevosCursos.length > 0) setCursos(prev => [...prev, ...nuevosCursos]);
        setIsImportModalOpen(false); setImportText(''); setImportError('');
        setModalNotificacion({ isOpen: true, type: 'info', title: 'Importación Completada', message: `${nuevosCursos.length} cursos importados al campus ${activeCampus}. Puedes activarlos en el Catálogo de Cursos. ${duplicados > 0 ? `Se omitieron ${duplicados} duplicados.` : ''}`, onConfirm: null });
      } else { setImportError('No se encontró un formato válido. Asegúrate de incluir los nombres de los cursos.'); }
    } catch (e) { setImportError('Error al procesar los datos.'); }
  };

  const guardarEdicionCurso = (e) => {
    e.preventDefault();
    if(!modalEditarCurso.curso.nombre.trim() || !modalEditarCurso.curso.codigoCurso.trim()) return;
    setCursos(prev => prev.map(c => c.id === modalEditarCurso.curso.id ? modalEditarCurso.curso : c));
    setModalEditarCurso({ isOpen: false, curso: null });
    setModalNotificacion({ isOpen: true, type: 'info', title: 'Curso Actualizado', message: 'Los datos del curso se actualizaron correctamente.', onConfirm: null });
  };

  const handleConfigChange = (cursoId, turno, cant) => setConfigSecciones(prev => ({ ...prev, [cursoId]: { ...(prev[cursoId] || { 'Mañana': 0, 'Tarde': 0, 'Noche': 0 }), [turno]: Math.max(0, parseInt(cant) || 0) } }));
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

  const seccionesFiltradas = seccionesGeneradas.filter(sec => {
    if (filtroProgTurno !== 'Todos' && sec.turno !== filtroProgTurno) return false;
    if (filtroProgCiclo !== 'Todos' && sec.ciclo !== filtroProgCiclo) return false;
    const asig = asignaciones[sec.seccionId];
    const isCompleto = asig && asig.docenteId && asig.dia && asig.horario;
    if (filtroProgEstado === 'Completos' && !isCompleto) return false;
    if (filtroProgEstado === 'Pendientes' && isCompleto) return false;
    return true;
  });

  const ciclosProgDisponibles = ['Todos', ...new Set(seccionesGeneradas.map(s => s.ciclo))].sort((a,b) => {
    if (a === 'Todos') return -1;
    if (b === 'Todos') return 1;
    return (ROMAN_VALS[a] || 99) - (ROMAN_VALS[b] || 99);
  });

  const handleAsignacion = (seccionId, campo, valor) => {
    setAsignaciones(prev => {
      const asig = prev[seccionId] || {};
      const nueva = { ...asig, [campo]: valor };
      const seccionAfectada = seccionesGeneradas.find(s => s.seccionId === seccionId);
      
      if (campo === 'docenteId' && valor !== '') {
        const docenteSeleccionado = docentes.find(d => d.id === parseInt(valor));
        if (docenteSeleccionado && asig.dia && seccionAfectada) {
          if (!docenteSeleccionado.disponibilidad.includes(`${asig.dia}-${seccionAfectada.turno}`)) nueva.dia = '';
        }
        if (docenteSeleccionado && asig.horario) nueva.horario = ''; 
      }

      if (nueva.docenteId && nueva.dia && nueva.horario) {
        let cruceDocente = false;
        let cruceSeccion = false;
        let mensajeCruce = '';

        for (const [idAsigExt, asigExt] of Object.entries(prev)) {
          if (idAsigExt !== seccionId && asigExt.dia === nueva.dia && asigExt.horario === nueva.horario) {
            if (asigExt.docenteId === nueva.docenteId) {
              cruceDocente = true;
              mensajeCruce = 'El docente ya tiene una clase programada en este mismo día y bloque horario. Se ha deshecho la selección.';
              break;
            }
            const seccionExistente = seccionesGeneradas.find(s => s.seccionId === idAsigExt);
            if (seccionExistente && seccionAfectada) {
              if (seccionExistente.malla === seccionAfectada.malla && seccionExistente.ciclo === seccionAfectada.ciclo && seccionExistente.codigo === seccionAfectada.codigo) {
                cruceSeccion = true;
                mensajeCruce = `La sección ${seccionAfectada.codigo} (Ciclo ${seccionAfectada.ciclo}) ya tiene el curso "${seccionExistente.nombre}" programado en este día y horario. Los alumnos tendrían un cruce. Se ha deshecho la selección.`;
                break;
              }
            }
          }
        }

        if (cruceDocente || cruceSeccion) {
          setModalNotificacion({ isOpen: true, type: 'info', title: 'Cruce Detectado', message: mensajeCruce, onConfirm: null });
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
    if (categoria === 'Coordinador' || categoria === 'Director Nacional') return { min: 0, max: 999, texto: 'Sin límite' };
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
          if (curso) totalHrs += (parseInt(curso.horas) || 0); 
        }
      });
      const lim = getLimitesCarga(d.tipoDocente, d.categoriaDocente);
      let est = 'CUMPLE'; let styl = 'Cum';
      if (totalHrs > lim.max) { est = 'EXCEDE LÍMITE'; styl = 'Exc'; } else if (totalHrs < lim.min) { est = 'FALTAN HORAS'; styl = 'Fal'; }
      xml += `<Row><Cell><Data ss:Type="String">${escapeXml(d.nombre)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tipoDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.categoriaDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="Number">${totalSec}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="Number">${totalHrs}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(lim.texto)}</Data></Cell><Cell ss:StyleID="${styl}"><Data ss:Type="String">${escapeXml(est)}</Data></Cell></Row>`;
    });
    xml += `</Table></Worksheet></Workbook>`;
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); link.download = `Reporte_Carga_Lectiva_${activeCampus}_${periodoActual}.xls`; document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const exportarDocentesExcel = () => {
    if (docentes.length === 0) return;
    const escapeXml = (unsafe) => unsafe ? unsafe.toString().replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] || c)) : '';
    let xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="H"><Alignment ss:Horizontal="Center"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/></Style><Style ss:ID="C"><Alignment ss:Horizontal="Center"/></Style></Styles><Worksheet ss:Name="Plana Docente"><Table><Row><Cell ss:StyleID="H"><Data ss:Type="String">APELLIDOS Y NOMBRES</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">DNI</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CELULAR</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CORREO CORPORATIVO</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">TIPO DOCENTE</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">CATEGORÍA DTC</Data></Cell><Cell ss:StyleID="H"><Data ss:Type="String">ESTADO PDF</Data></Cell></Row>`;
    docentes.forEach(d => { xml += `<Row><Cell><Data ss:Type="String">${escapeXml(d.nombre)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.dni)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.celular)}</Data></Cell><Cell><Data ss:Type="String">${escapeXml(d.correoCorp)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tipoDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.categoriaDocente)}</Data></Cell><Cell ss:StyleID="C"><Data ss:Type="String">${escapeXml(d.tieneFichaSunedu ? 'Cargado' : 'Pendiente')}</Data></Cell></Row>`; });
    xml += `</Table></Worksheet></Workbook>`;
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); link.download = `Reporte_Plana_Docente_${activeCampus}_${periodoActual}.xls`; document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const exportarHorarioGeneral = () => {
    const grupos = {};
    seccionesGeneradas.forEach(seccion => {
      const keyFila = `${seccion.malla}|${seccion.ciclo}|${seccion.codigo}|${seccion.turno}`;
      if (!grupos[keyFila]) {
        grupos[keyFila] = { malla: seccion.malla, ciclo: seccion.ciclo, seccion: seccion.codigo, turno: seccion.turno.charAt(0), horario: { 'Lunes': [], 'Martes': [], 'Miércoles': [], 'Jueves': [], 'Viernes': [], 'Sábado': [] } };
      }
      const asig = asignaciones[seccion.seccionId];
      if (asig && asig.dia && asig.docenteId) {
        const docente = docentes.find(d => d.id === parseInt(asig.docenteId));
        const nombreDocente = docente ? docente.nombre : 'Por Asignar';
        grupos[keyFila].horario[asig.dia].push(`${seccion.nombre}\n${nombreDocente}`);
      }
    });

    const filas = Object.values(grupos).sort((a, b) => {
      if (a.malla !== b.malla) return a.malla.localeCompare(b.malla);
      if (a.ciclo !== b.ciclo) return a.ciclo.localeCompare(b.ciclo);
      return a.seccion.localeCompare(b.seccion);
    });

    if (filas.length === 0) { setModalNotificacion({ isOpen: true, type: 'info', title: 'Reporte Vacío', message: 'No hay datos en la malla para generar el horario.', onConfirm: null }); return; }
    const escapeXml = (unsafe) => unsafe ? unsafe.toString().replace(/[<>&'"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '\'': '&apos;', '"': '&quot;' }[c] || c)) : '';
    let xml = `<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Styles><Style ss:ID="Header"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/><Font ss:Bold="1" ss:Color="#FFFFFF"/><Interior ss:Color="#4F46E5" ss:Pattern="Solid"/></Style><Style ss:ID="Center"><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style><Style ss:ID="WrapText"><Alignment ss:Horizontal="Center" ss:Vertical="Center" ss:WrapText="1"/></Style></Styles><Worksheet ss:Name="Horario General"><Table><Column ss:Width="80"/><Column ss:Width="60"/><Column ss:Width="60"/><Column ss:Width="50"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Column ss:Width="160"/><Row ss:Height="20"><Cell ss:StyleID="Header"><Data ss:Type="String">PLAN</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">CICLO</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">SECCIÓN</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">TURNO</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">LUNES</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">MARTES</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">MIÉRCOLES</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">JUEVES</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">VIERNES</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">SÁBADO</Data></Cell></Row>`;
    filas.forEach(f => {
      const getData = (dia) => {
        if (f.horario[dia].length === 0) return '';
        const texto = f.horario[dia].join('\n\n'); 
        return escapeXml(texto).replace(/\n/g, '&#10;');
      };
      xml += `<Row ss:AutoFitHeight="1"><Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.malla)}</Data></Cell><Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.ciclo)}</Data></Cell><Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.seccion)}</Data></Cell><Cell ss:StyleID="Center"><Data ss:Type="String">${escapeXml(f.turno)}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Lunes')}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Martes')}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Miércoles')}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Jueves')}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Viernes')}</Data></Cell><Cell ss:StyleID="WrapText"><Data ss:Type="String">${getData('Sábado')}</Data></Cell></Row>`;
    });
    xml += `</Table></Worksheet></Workbook>`;
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); link.download = `Reporte_Horario_General_${activeCampus}_${periodoActual}.xls`; document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const crearNuevoPeriodo = () => {
    const nuevoNombre = modalNuevoPeriodo.nombre.trim();
    if (!nuevoNombre || periodos.includes(nuevoNombre)) return;
    const nuevosDatos = { ...DATOS_PERIODO_VACIO };
    if (modalNuevoPeriodo.clonarDatos) { nuevosDatos.cursos = [...cursos]; nuevosDatos.docentes = [...docentes]; }
    setDb(prev => ({ ...prev, [`${activeCampus}-${nuevoNombre}`]: nuevosDatos })); 
    setPeriodos(prev => [...prev, nuevoNombre]); setPeriodoActual(nuevoNombre); setModalNuevoPeriodo({ isOpen: false, nombre: '', clonarDatos: true });
  };

  // ============================================================================
  // 4. RENDERIZADO PRINCIPAL
  // ============================================================================

  const disableDNIField = auth?.rol === 'Docente' || (auth?.rol === 'Coordinador' && !isProfileComplete);

  if (!auth) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
        
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative z-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-3"><Calendar className="w-8 h-8" /></div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">EduPlan Contabilidad</h1>
            <p className="text-slate-500 text-sm mt-1">Plataforma de Programación Académica</p>
          </div>
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Rol de Acceso</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setLoginData({...loginData, rol: 'Coordinador'})} className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${loginData.rol === 'Coordinador' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500 hover:border-blue-300'}`}><UserCheck className="w-6 h-6" /> <span className="font-bold text-sm">Coordinador</span></button>
                <button type="button" onClick={() => setLoginData({...loginData, rol: 'Docente'})} className={`py-3 px-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${loginData.rol === 'Docente' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-500 hover:border-indigo-300'}`}><User className="w-6 h-6" /> <span className="font-bold text-sm">Docente</span></button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Campus / Sede</label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <select value={loginData.campus} onChange={e => setLoginData({...loginData, campus: e.target.value})} className="w-full p-3 pl-10 border-2 border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:bg-white outline-none text-slate-700 font-medium appearance-none">{CAMPUS_LIST.map(c => <option key={c} value={c}>{c}</option>)}</select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-2">DNI (Clave de Acceso)</label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input required type="password" value={loginData.dni} onChange={e => setLoginData({...loginData, dni: e.target.value})} placeholder="Ingrese su DNI" className="w-full p-3 pl-10 border-2 border-slate-200 rounded-xl bg-slate-50 focus:border-blue-500 focus:bg-white outline-none text-slate-800 font-medium" />
              </div>
            </div>
            <button type="submit" className={`w-full py-3.5 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl ${loginData.rol === 'Coordinador' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`}><LogIn className="w-5 h-5" /> Ingresar al Sistema</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans relative pb-10">
      <header className="bg-blue-900 text-white shadow-md relative z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold flex items-center gap-2"><Calendar className="w-7 h-7 text-blue-300" /> EduPlan: Contabilidad</h1></div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-blue-950/50 p-2 rounded-xl flex items-center gap-2 border border-blue-800">
              <MapPin className="w-4 h-4 text-blue-300" />
              <span className="text-xs font-bold text-blue-200 uppercase">Campus:</span>
              {auth.rol === 'Coordinador' && auth.campus === 'Lima Norte' && canAccessAdmin ? (
                <select value={activeCampus} onChange={(e) => setActiveCampus(e.target.value)} className="bg-blue-800 text-white border border-blue-700 text-sm font-bold rounded-lg p-1 outline-none">
                  {CAMPUS_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              ) : (
                <span className="text-sm font-bold text-white px-2 bg-blue-800 rounded-lg py-1">{activeCampus}</span>
              )}
            </div>

            <div className="bg-blue-950/50 p-2 rounded-xl flex items-center gap-2 border border-blue-800">
              <History className="w-4 h-4 text-blue-300" />
              <span className="text-xs font-bold text-blue-200 uppercase">Periodo:</span>
              {canAccessAdmin ? (
                <>
                  <select value={periodoActual} onChange={(e) => setPeriodoActual(e.target.value)} className="bg-blue-800 text-white border border-blue-700 text-sm font-bold rounded-lg p-1 outline-none">
                    {periodos.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <div className="w-px h-5 bg-blue-800 mx-1"></div>
                  <button onClick={() => setModalNuevoPeriodo({ ...modalNuevoPeriodo, isOpen: true })} className="bg-blue-700 hover:bg-blue-600 text-white p-1.5 rounded-lg flex items-center gap-1 text-xs font-bold" title="Nuevo Periodo"><Plus className="w-4 h-4" /></button>
                </>
              ) : (
                <span className="text-sm font-bold text-white px-2 bg-blue-800 rounded-lg py-1">{periodoActual}</span>
              )}
            </div>

            <div className="bg-emerald-900/50 p-2 rounded-xl flex items-center gap-3 border border-emerald-800 ml-auto lg:ml-4">
               <div className="flex items-center gap-2">
                 <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center"><User className="w-4 h-4 text-emerald-100"/></div>
                 <div className="flex flex-col">
                   <span className="text-[10px] text-emerald-300 font-bold uppercase leading-none">{auth.rol}</span>
                   <span className="text-xs text-white font-medium leading-tight">DNI: {auth.dni}</span>
                 </div>
               </div>
               <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors ml-2" title="Cerrar Sesión">
                 <LogOut className="w-4 h-4" />
               </button>
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 overflow-x-auto">
          <button onClick={() => setActiveTab('portal-docente')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'portal-docente' ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><UserPlus className="w-5 h-5" /> Portal Docente</button>
          
          {auth.rol === 'Coordinador' && (
            <>
              <div className="w-px h-6 bg-slate-300 my-auto mx-2"></div>
              {canAccessAdmin ? (
                <>
                  <button onClick={() => setActiveTab('catalogo')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'catalogo' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><BookOpen className="w-5 h-5" /> Catálogo de Cursos</button>
                  <button onClick={() => setActiveTab('secciones')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'secciones' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><LayoutGrid className="w-5 h-5" /> Apertura Secciones</button>
                  <button onClick={() => setActiveTab('docentes')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'docentes' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><Users className="w-5 h-5" /> Plana Docente</button>
                  <button onClick={() => setActiveTab('programacion')} className={`py-4 px-2 flex items-center gap-2 font-medium border-b-2 whitespace-nowrap ${activeTab === 'programacion' ? 'border-blue-600 text-blue-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}><Calendar className="w-5 h-5" /> Programación de Horarios</button>
                </>
              ) : (
                <div className="flex items-center gap-2 px-4 text-amber-600 text-sm font-bold">
                  <Lock className="w-4 h-4" /> Envía tu ficha para desbloquear los módulos
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* VISTA: PORTAL DOCENTE */}
        {activeTab === 'portal-docente' && (
          <div className="max-w-4xl mx-auto">
            {auth.rol === 'Coordinador' && !isProfileComplete && (
              <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-800 p-4 mb-6 rounded-r-lg shadow-sm animate-pulse">
                <div className="flex items-center gap-2 font-bold"><AlertCircle className="w-5 h-5"/> Acción Requerida</div>
                <p className="text-sm mt-1">Estimado Coordinador, por normativa debe llenar y enviar su propia ficha docente antes de acceder al panel de administración.</p>
              </div>
            )}

            <div className="bg-indigo-900 text-white p-8 rounded-t-2xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-2">Ficha de Actualización Docente</h2>
                <p className="text-indigo-200">Campus: <span className="font-bold text-white">{activeCampus}</span> • Periodo {periodoActual}</p>
              </div>
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4"><UserPlus className="w-64 h-64" /></div>
            </div>
            <form onSubmit={guardarDocente} className="bg-white rounded-b-2xl shadow-lg border border-slate-200 p-8 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span> Datos Personales y Contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Apellidos y Nombres *</label><input required type="text" value={formDocente.apellidosNombres} onChange={e => setFormDocente({...formDocente, apellidosNombres: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">DNI / Carnet Ext. *</label>
                    <input required type="text" value={formDocente.dni} onChange={e => setFormDocente({...formDocente, dni: e.target.value})} disabled={disableDNIField} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none disabled:opacity-60 disabled:cursor-not-allowed font-bold text-slate-700" />
                    {disableDNIField ? (
                      <p className="text-[10px] text-indigo-600 mt-1">DNI bloqueado para validar su usuario de sesión.</p>
                    ) : (
                      <p className="text-[10px] text-slate-500 mt-1">Puede ingresar DNIs de otros docentes para registrarlos.</p>
                    )}
                  </div>
                  <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Celular</label><input type="tel" value={formDocente.celular} onChange={e => setFormDocente({...formDocente, celular: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>
                  <div><label className="block text-xs font-bold text-slate-600 uppercase mb-1">Correo Corporativo</label><input type="email" value={formDocente.correoCorp} onChange={e => setFormDocente({...formDocente, correoCorp: e.target.value})} className="w-full p-2.5 border border-slate-300 rounded-lg bg-slate-50 outline-none" /></div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span> Perfil Académico</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-start">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Tipo de Docente</label>
                    <div className="flex gap-4">
                      <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${formDocente.tipoDocente === 'DTP' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><input type="radio" value="DTP" checked={formDocente.tipoDocente === 'DTP'} onChange={() => setFormDocente({...formDocente, tipoDocente: 'DTP'})} className="hidden" /><span className={`block font-bold ${formDocente.tipoDocente === 'DTP' ? 'text-indigo-700' : 'text-slate-600'}`}>DTP</span><span className="text-[10px] text-slate-500 block mt-1">Tiempo Parcial (Max 15h)</span></label>
                      <label className={`flex-1 p-3 rounded-lg border-2 cursor-pointer transition-all ${formDocente.tipoDocente === 'DTC' ? 'border-indigo-600 bg-indigo-50' : 'border-slate-200'}`}><input type="radio" value="DTC" checked={formDocente.tipoDocente === 'DTC'} onChange={() => setFormDocente({...formDocente, tipoDocente: 'DTC'})} className="hidden" /><span className={`block font-bold ${formDocente.tipoDocente === 'DTC' ? 'text-indigo-700' : 'text-slate-600'}`}>DTC</span><span className="text-[10px] text-slate-500 block mt-1">Tiempo Completo</span></label>
                    </div>
                    {formDocente.tipoDocente === 'DTC' && (
                      <div className="mt-4"><label className="block text-xs font-bold text-indigo-600 uppercase mb-1">Categoría del Tiempo Completo</label>
                      <select value={formDocente.categoriaDocente} onChange={(e) => setFormDocente({...formDocente, categoriaDocente: e.target.value})} className="w-full p-2.5 border-2 border-indigo-200 rounded-lg bg-indigo-50/50 text-indigo-900 text-sm outline-none font-medium">
                        <option value="Regular">DTC Regular / Otros (28 - 33 hrs)</option>
                        <option value="Nacional">Docente Nacional (Max 20 hrs)</option>
                        <option value="Apoyo Escuela">Apoyo en Escuela (Max 25 hrs)</option>
                        <option value="Apoyo SUBE">Apoyo SUBE (Max 25 hrs)</option>
                        <option value="Coordinador">Coordinador (Sin límite de hrs)</option>
                        <option value="Director Nacional">Director Nacional (Sin límite de hrs)</option>
                      </select></div>
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

              <section>
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4 flex items-center gap-2"><span className="bg-indigo-100 text-indigo-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span> Cursos a Dictar</h3>
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700">Seleccione los cursos que puede dictar:</label>
                  
                  {cursos.length === 0 ? (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg text-amber-700 text-sm">El coordinador aún no ha activado cursos de malla para esta sede en este periodo.</div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm">
                      {(() => {
                        const mallaSeleccionada = portalMalla || (mallasUnicas[0] || '');
                        const cicloSeleccionado = ciclosDisponibles.includes(portalCiclo) && portalCiclo !== 'Todos' ? portalCiclo : (ciclosDisponibles.find(c => c !== 'Todos') || '');
                        const cursosAMostrar = cursos.filter(c => c.malla === mallaSeleccionada && c.ciclo === cicloSeleccionado);

                        return (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">1. Elegir Plan / Malla</label>
                                <select value={mallaSeleccionada} onChange={e => { setPortalMalla(e.target.value); setPortalCiclo(''); }} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium">
                                  {mallasUnicas.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">2. Elegir Ciclo</label>
                                <select value={cicloSeleccionado} onChange={e => setPortalCiclo(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium">
                                  {ciclosDisponibles.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>Ciclo {c}</option>)}
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {cursosAMostrar.length === 0 && <div className="col-span-3 text-center text-sm text-slate-500 py-4">No hay cursos en este ciclo.</div>}
                              {cursosAMostrar.map(curso => (
                                <label key={curso.id} className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${formDocente.cursosHabilitados.includes(curso.id) ? 'bg-indigo-100 border-indigo-400 shadow-sm' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                  <input type="checkbox" className="mt-1 w-4 h-4 text-indigo-600 rounded" checked={formDocente.cursosHabilitados.includes(curso.id)} onChange={() => handleDocenteCheckbox('cursosHabilitados', curso.id)} />
                                  <div className="flex-1">
                                    <span className="block text-sm font-bold text-slate-800 leading-tight mb-1">{curso.nombre}</span>
                                    <span className="inline-block text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded font-semibold">{curso.horas} Hrs Lectivas</span>
                                  </div>
                                </label>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {formDocente.cursosHabilitados.length > 0 && (
                    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 animate-fade-in">
                      <span className="block text-xs font-bold text-indigo-800 uppercase mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> Cursos Seleccionados ({formDocente.cursosHabilitados.length})
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {formDocente.cursosHabilitados.map(id => {
                          const c = cursos.find(x => x.id === id);
                          return c ? (
                            <span key={id} className="bg-white border border-indigo-300 text-indigo-800 pl-2 pr-1 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-sm">
                              {c.nombre} <span className="text-[10px] text-slate-400 font-normal">({c.malla} - C.{c.ciclo})</span>
                              <button type="button" onClick={() => handleDocenteCheckbox('cursosHabilitados', id)} className="p-0.5 hover:bg-red-100 hover:text-red-600 rounded ml-1 transition-colors"><X className="w-3 h-3"/></button>
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <div className="pt-6 border-t border-slate-200 flex justify-end"><button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg flex items-center gap-2 shadow-lg shadow-indigo-200"><Save className="w-6 h-6" /> Enviar Ficha</button></div>
            </form>
          </div>
        )}

        {/* VISTA 1: CATÁLOGO DE CURSOS (REPORTE Y ACTIVACIÓN MASIVA) */}
        {auth.rol === 'Coordinador' && canAccessAdmin && activeTab === 'catalogo' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Catálogo de Cursos Importados</h2>
                <p className="text-slate-500 text-sm mt-1">Activa o desactiva los cursos que se van a dictar en <span className="font-bold text-blue-600">{activeCampus}</span>.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <select value={filtroMalla} onChange={(e) => { setFiltroMalla(e.target.value); setFiltroCiclo('Todos'); }} className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                  {mallasDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={filtroCiclo} onChange={(e) => setFiltroCiclo(e.target.value)} className="bg-white border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500">
                  {ciclosDisponibles.map(c => <option key={c} value={c}>{c === 'Todos' ? 'Todos los Ciclos' : `Ciclo ${c}`}</option>)}
                </select>
                <button onClick={() => setIsImportModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><FileSpreadsheet className="w-4 h-4" /> Importar Sheets</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold w-20">Código</th>
                    <th className="p-4 font-bold">Nombre del Curso</th>
                    <th className="p-4 font-bold">Malla y Ciclo</th>
                    <th className="p-4 font-bold text-center">Horas</th>
                    <th className="p-4 font-bold">Perfil / Especialidad</th>
                    <th className="p-4 font-bold text-center">Estado</th>
                    <th className="p-4 font-bold text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {cursosFiltrados.length === 0 ? (
                    <tr><td colSpan="7" className="p-8 text-center text-slate-500">No hay cursos cargados. Usa el botón "Importar Sheets".</td></tr>
                  ) : cursosFiltrados.map(curso => (
                    <tr key={curso.id} className={`hover:bg-slate-50 transition-colors ${!curso.activo ? 'opacity-60 bg-slate-50/50' : ''}`}>
                      <td className="p-4 font-mono text-xs text-slate-500">{curso.codigoCurso}</td>
                      <td className="p-4 font-bold text-slate-800">{curso.nombre}</td>
                      <td className="p-4">
                        <span className="block font-medium text-slate-700">{curso.malla}</span>
                        <span className="text-xs text-slate-500">Ciclo {curso.ciclo}</span>
                      </td>
                      <td className="p-4 text-center font-bold text-indigo-600">{curso.horas}</td>
                      <td className="p-4"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">{curso.perfilRequerido}</span></td>
                      <td className="p-4 text-center">
                        <button onClick={() => toggleCursoActivo(curso.id)} className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors shadow-sm border ${curso.activo ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200' : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'}`}>
                          {curso.activo ? 'ACTIVO' : 'INACTIVO'}
                        </button>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button onClick={() => setModalEditarCurso({ isOpen: true, curso: {...curso} })} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar Curso"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => setModalNotificacion({isOpen: true, type: 'confirm', title: 'Eliminar Curso', message: `¿Eliminar "${curso.nombre}" de la base de datos?`, onConfirm: () => eliminarCurso(curso.id)})} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar Curso"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VISTA 2: APERTURA DE SECCIONES (SÓLO CURSOS ACTIVOS) */}
        {auth.rol === 'Coordinador' && canAccessAdmin && activeTab === 'secciones' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Apertura de Secciones</h2>
                <p className="text-slate-500 text-sm mt-1">Configura la cantidad de aulas (secciones) para los cursos <span className="font-bold text-green-600">Activos</span>.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <select value={filtroMalla} onChange={(e) => { setFiltroMalla(e.target.value); setFiltroCiclo('Todos'); }} className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5">
                  {mallasDisponibles.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select value={filtroCiclo} onChange={(e) => setFiltroCiclo(e.target.value)} className="bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg p-2.5">
                  {ciclosDisponibles.map(c => <option key={c} value={c}>{c === 'Todos' ? 'Todos los Ciclos' : `Ciclo ${c}`}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-slate-50">
              {cursosActivosFiltrados.length === 0 && <div className="col-span-2 text-center py-8 text-slate-500">No hay cursos activados en esta categoría. Ve al <button onClick={()=>setActiveTab('catalogo')} className="text-blue-600 font-bold hover:underline">Catálogo de Cursos</button> para activar algunos.</div>}
              
              {cursosActivosFiltrados.map(curso => {
                const config = configSecciones[curso.id] || { 'Mañana': 0, 'Tarde': 0, 'Noche': 0 };
                return (
                  <div key={curso.id} className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">CICLO {curso.ciclo}</span>
                          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">{curso.malla}</span>
                        </div>
                        <button onClick={() => toggleCursoActivo(curso.id)} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" title="Desactivar curso">
                          <X className="w-3 h-3" /> Quitar
                        </button>
                      </div>
                      <h3 className="font-bold text-lg mb-4 text-slate-800">{curso.nombre}</h3>
                    </div>
                    <div className="border-t border-slate-100 pt-4 mt-auto">
                      <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">Aperturar aulas (A, B, C)</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-amber-600 uppercase flex items-center gap-1"><Sun className="w-3 h-3"/> Mañana</label><input type="number" min="0" value={config['Mañana']} onChange={(e) => handleConfigChange(curso.id, 'Mañana', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium focus:ring-2 focus:ring-amber-500"/></div>
                        <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-orange-600 uppercase flex items-center gap-1"><Sunset className="w-3 h-3"/> Tarde</label><input type="number" min="0" value={config['Tarde']} onChange={(e) => handleConfigChange(curso.id, 'Tarde', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium focus:ring-2 focus:ring-orange-500"/></div>
                        <div className="flex flex-col gap-1"><label className="text-[10px] font-semibold text-indigo-600 uppercase flex items-center gap-1"><Moon className="w-3 h-3"/> Noche</label><input type="number" min="0" value={config['Noche']} onChange={(e) => handleConfigChange(curso.id, 'Noche', e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-sm outline-none text-center font-medium focus:ring-2 focus:ring-indigo-500"/></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VISTA: PLANA DOCENTE */}
        {auth.rol === 'Coordinador' && canAccessAdmin && activeTab === 'docentes' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div><h2 className="text-xl font-bold text-slate-800">Plana Docente - Sede {activeCampus}</h2></div>
              <button onClick={exportarDocentesExcel} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium"><Download className="w-4 h-4" /> Exportar Datos</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 font-bold">Docente</th>
                    <th className="p-4 font-bold">Tipo / Doc.</th>
                    <th className="p-4 font-bold">Cursos Habilitados</th>
                    <th className="p-4 font-bold text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {docentes.length === 0 ? (
                     <tr><td colSpan="4" className="p-8 text-center text-slate-500">No hay docentes registrados en la sede de {activeCampus}. Utiliza el Portal Docente.</td></tr>
                  ) : docentes.map(docente => (
                    <tr key={docente.id} className="hover:bg-slate-50">
                      <td className="p-4 font-medium text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">{docente.nombre.substring(0,2).toUpperCase()}</div>
                          <div><span className="block font-bold">{docente.nombre}</span><span className="text-xs text-slate-500">{docente.correoCorp || 'Sin correo'}</span></div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${docente.tipoDocente === 'DTC' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{docente.tipoDocente}</span>
                        <span className="block text-xs text-slate-500 mt-1">DNI: {docente.dni || '---'}</span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {docente.cursosHabilitados?.map(cId => {
                            const c = cursos.find(curso => curso.id === cId);
                            return c ? <span key={cId} className="bg-slate-100 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full text-[10px]" title={c.nombre}>{c.codigoCurso}</span> : null;
                          })}
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <button onClick={() => confirmarEliminarDocente(docente)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Dar de baja docente"><Trash2 className="w-5 h-5" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VISTA: PROGRAMACIÓN */}
        {auth.rol === 'Coordinador' && canAccessAdmin && activeTab === 'programacion' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Asignación - Sede {activeCampus}</h2>
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

            {/* FILTROS */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 text-slate-600"><Filter className="w-5 h-5" /><span className="font-bold text-sm">Filtros:</span></div>
              <select value={filtroProgCiclo} onChange={e => setFiltroProgCiclo(e.target.value)} className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                {ciclosProgDisponibles.map(c => <option key={c} value={c}>{c === 'Todos' ? 'Todos los Ciclos' : `Ciclo ${c}`}</option>)}
              </select>
              <select value={filtroProgTurno} onChange={e => setFiltroProgTurno(e.target.value)} className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Todos">Todos los Turnos</option><option value="Mañana">Mañana</option><option value="Tarde">Tarde</option><option value="Noche">Noche</option>
              </select>
              <select value={filtroProgEstado} onChange={e => setFiltroProgEstado(e.target.value)} className="bg-white border border-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                <option value="Todos">Todos los Estados</option><option value="Pendientes">Pendientes por Asignar</option><option value="Completos">Asignación Completa</option>
              </select>
            </div>

            <div className="grid gap-6">
              {seccionesFiltradas.length === 0 && <div className="text-center p-8 text-slate-500">No hay secciones que coincidan con estos filtros en {activeCampus}.</div>}
              {seccionesFiltradas.map(seccion => {
                const asignacion = asignaciones[seccion.seccionId] || { docenteId: '', dia: '', horario: '' };
                const isCompleto = asignacion.docenteId && asignacion.dia && asignacion.horario;
                const docentesRecomendados = docentes.filter(d => d.cursosHabilitados && d.cursosHabilitados.includes(seccion.id));
                const otrosDocentes = docentes.filter(d => !d.cursosHabilitados || !d.cursosHabilitados.includes(seccion.id));
                const docenteSeleccionado = docentes.find(d => d.id === parseInt(asignacion.docenteId));
                const disponibilidadDocente = docenteSeleccionado ? (docenteSeleccionado.disponibilidad || []) : [];
                const horariosDelTurno = HORARIOS[seccion.turno] || [];

                return (
                  <div key={seccion.seccionId} className={`bg-white rounded-xl shadow-sm border-l-4 p-5 flex flex-col md:flex-row gap-6 transition-all ${isCompleto ? 'border-green-500' : 'border-amber-400'}`}>
                    <div className="md:w-1/3 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-bold px-2 py-1 rounded flex items-center gap-1 ${seccion.turno === 'Mañana' ? 'bg-amber-100 text-amber-700' : seccion.turno === 'Tarde' ? 'bg-orange-100 text-orange-700' : 'bg-indigo-100 text-indigo-700'}`}>Sección {seccion.codigo}</span>
                        <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded flex items-center gap-1"><Clock className="w-3 h-3"/> {seccion.horas} Horas</span>
                        {isCompleto && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                      </div>
                      <h3 className="text-lg font-bold text-slate-800">{seccion.nombre}</h3>
                      <p className="text-xs font-bold text-slate-400">{seccion.malla} - Ciclo {seccion.ciclo}</p>
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
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50"><h3 className="font-bold text-slate-800 flex items-center gap-2"><FileSpreadsheet className="text-emerald-600 w-5 h-5"/> Importar Malla Curricular ({activeCampus})</h3><button onClick={() => setIsImportModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button></div>
            <div className="p-6 overflow-y-auto">
              <p className="text-sm text-slate-600 mb-4">Copia las filas de tu Excel y pégalas:</p>
              <div className="bg-slate-100 p-3 rounded-lg flex gap-4 text-xs font-mono text-slate-700 mb-4 overflow-x-auto border border-slate-200">
                <span className="font-bold">CICLO</span> | <span className="font-bold">CÓDIGO</span> | <span className="font-bold">EXPERIENCIAS CURRICULARES</span> | <span className="font-bold text-purple-700">HORAS (LECTIVAS)</span> | <span className="font-bold">CRÉDITOS</span> | <span className="font-bold">MALLA</span>
              </div>
              <textarea className="w-full h-48 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono whitespace-pre" placeholder="Ejemplo:&#10;III&#9;CON301&#9;Contabilidad de Costos&#9;4&#9;3&#9;Malla 2024" value={importText} onChange={(e) => setImportText(e.target.value)}></textarea>
              {importError && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> {importError}</p>}
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3"><button onClick={() => setIsImportModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button><button onClick={procesarImportacion} className="px-4 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg">Procesar e Importar</button></div>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN DE CURSO */}
      {modalEditarCurso.isOpen && modalEditarCurso.curso && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2"><Edit className="text-blue-600 w-5 h-5"/> Editar Curso</h3>
              <button type="button" onClick={() => setModalEditarCurso({ isOpen: false, curso: null })} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={guardarEdicionCurso} className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Nombre del Curso *</label>
                  <input required type="text" value={modalEditarCurso.curso.nombre} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, nombre: e.target.value } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Código</label>
                  <input required type="text" value={modalEditarCurso.curso.codigoCurso} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, codigoCurso: e.target.value } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Ciclo</label>
                  <input required type="text" value={modalEditarCurso.curso.ciclo} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, ciclo: e.target.value.toUpperCase() } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Horas Lectivas</label>
                  <input required type="number" min="1" value={modalEditarCurso.curso.horas} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, horas: parseInt(e.target.value) || 0 } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Malla / Plan</label>
                  <input required type="text" value={modalEditarCurso.curso.malla} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, malla: e.target.value } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Perfil Requerido (Especialidad)</label>
                  <input type="text" list="perfiles-list" value={modalEditarCurso.curso.perfilRequerido} onChange={e => setModalEditarCurso({ ...modalEditarCurso, curso: { ...modalEditarCurso.curso, perfilRequerido: e.target.value } })} className="w-full p-2.5 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Ej: Tributación, Costos, etc." />
                  <datalist id="perfiles-list">
                    {PERFILES.map(p => <option key={p} value={p} />)}
                  </datalist>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-200 mt-6">
                <button type="button" onClick={() => setModalEditarCurso({ isOpen: false, curso: null })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Guardar Cambios</button>
              </div>
            </form>
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
              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg"><label className="flex items-start gap-3 cursor-pointer"><input type="checkbox" checked={modalNuevoPeriodo.clonarDatos} onChange={(e) => setModalNuevoPeriodo({...modalNuevoPeriodo, clonarDatos: e.target.checked})} className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer" /><div><span className="block text-sm font-bold text-slate-800">Clonar datos del campus {activeCampus}</span><span className="block text-xs text-slate-600 mt-1">Copia la Malla y Docentes de esta sede.</span></div></label></div>
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
              {modalNotificacion.type === 'confirm' ? (<><button onClick={() => setModalNotificacion({ ...modalNotificacion, isOpen: false })} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200 rounded-lg">Cancelar</button><button onClick={modalNotificacion.onConfirm} className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg">Confirmar</button></>) : (<button onClick={() => setModalNotificacion({ ...modalNotificacion, isOpen: false })} className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Entendido</button>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}