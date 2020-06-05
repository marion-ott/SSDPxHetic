# Création d'une infrastructure AWS avec terraform

## Prérequis
* Terraform
* un compte AWS

## Ressources créées
* Une instance staging-application pour simuler l'environnement de production et effectuer différents tests
* Une instance production-application pour l'environnement de production et déployer notre projet de manière définitive
* Une instance documentDB pour chaque environnement, acceptant les connexions des instances de son même environnement
* Deux load balancer ; chacun lié à une instance qui "écoute" sur le port 80 pour le back-office et sur le port 9000 pour l'API

<info>Il est possible de modifier le nombre d'instance pour chaque environnement en modifiant `instance_count` dans le fichier `main.tf.</info>

## Création d'un user IAM

* Se connecter à la console AWS
* Dans la section IAM, créer un groupe IAM et lui rattacher les stratégies `AmazonEC2FullAccess` et `AmazonDocDBFullAccess`
* Créer l'utilisateur avec accès par programmation IAM rattaché a ce groupe IAM
* Noter bien `AWS_ACCESS_KEY_ID` ainsi que `AWS_SECRET_ACCESS_KEY`

## Génération d'une clef ssh
Générez une clef ssh avec la commande suivante`
```sh
ssh-keygen -f path/id_rsa_aws
```
## Générer l'infrastructure
```sh
cd project-name/automation/terraform
export AWS_ACCESS_KEY_ID="mon_id_de_clef_dacces"
export AWS_SECRET_ACCESS_KEY="ma_clef_dacces_secrete"
terraform plan
terraform apply
```

## Récupérer les adresses IP publiques
Vous pouvez récupérer les adresses IP des deux instances dans le service EC2 de la console AWS ou taper simplement dans le terminal
```sh
terraform state pull | grep \"public_ip\"</code>.
```

