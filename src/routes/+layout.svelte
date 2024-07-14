<script>
	import Navbar from '$lib/components/navbar.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.css';
</script>

<Navbar />
<slot></slot>
<Toaster />
