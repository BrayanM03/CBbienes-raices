<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="Responsive Admin &amp; Dashboard Template based on Bootstrap 5">
	<meta name="author" content="AdminKit">
	<meta name="keywords" content="adminkit, bootstrap, bootstrap 5, admin, dashboard, template, responsive, css, sass, html, theme, front-end, ui kit, web">

	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link rel="shortcut icon" href="img/icons/icon-48x48.png" />

	<link rel="canonical" href="https://demo-basic.adminkit.io/pages-sign-in.html" />

	<title>Iniciar sesión | Systech</title>

	<link href="css/app.css" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
	<style>
		.preloader {
  width: 16px;
  height: 16px;
  border: 2.5px solid #eee;
  border-top: 2.5px solid tomato;
  border-radius: 50%;
  animation-name: girar;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes girar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
	</style>

</head>

<body style="background-image: url(img/background.jpg); overflow-y: hidden;">
	<main class="d-flex w-100">
		<div class="container d-flex flex-column">
			<div class="row vh-100">
				<div class="col-sm-10 col-md-8 col-lg-6 mt-auto mb-auto d-table h-100">
					<div class="d-table-cell align-midle">

						<div class="text-center mt-4" >
							<h1 class="h2"style="color:white">Hola, bienvenido</h1>
							<p class="lead"style="color:#3e4144">
								Accede a tu cuenta para continuar
							</p>
						</div>

						<div class="card" style="border-radius:10px;">
							<div class="card-body">
								<div class="m-sm-4">
									<div class="text-center">
										<img src="img/logo.jpg" alt="Charles Hall" class="img-fluid" width="180" height="150" />
									</div>
									<form>
										<div class="mb-3">
											<label class="form-label">Usuario</label>
											<input class="form-control form-control-lg animate__animated" type="text" name="user" id="user" placeholder="Ingresa tu usuario" />
										</div>
										<div class="mb-3">
											<label class="form-label">Contraseña</label>
											<input class="form-control form-control-lg animate__animated" type="password" name="pass" id="pass" placeholder="Ingresa tu contraseña" />
											<small>
												<a href="index.html">¿Olvidaste tu contraseña?</a>
											</small>
										</div>
										<div>
											<label class="form-check">
												<input class="form-check-input" type="checkbox" value="remember-me" name="remember-me" checked>
												<span class="form-check-label">
													Recuerdame la proxima vez
												</span>
											</label>
										</div>
										<div class="text-center mt-3">
											<a id="btn-login" href="#validando" class="btn btn-lg btn-primary" style="width:130px; display:flex; justify-content:center" onclick="iniciarSesion()">Entrar</a>
											<!-- <button type="submit" class="btn btn-lg btn-primary">Sign in</button> -->
										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>

	
	<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
	<script src="js/app.js"></script>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script src="js/login/login.js"></script>

</body>

</html>