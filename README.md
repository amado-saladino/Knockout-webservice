# Knockout with REST web service
CRUD operations in Knockout with REST Api built in visual studio and PHP

## Publish web api service

Open **OnlineTests** in **Visual Stduio** and publish it to file system to get a publish folder, you may publish this web api to **IIS express**, while publishing the project don not ignore folders in **App_Data**

## Publish to IIS Express

Suppose we have published to a folder **publish** on **desktop**, copy the contents of this folder to a folder **Tests** under **My Web Sites** folder; the Home directory of IIS Express

## IIS EXpress configuration

To make this web service available across a network, we need to enable requests to IP address of the hosting machine, add this **site** node under **sites** node in IIS Express configuration file:

**My Documents\\IIS Express\\config\\applicationhost.conf**

```
<site name="WebSite2" id="2" serverAutoStart="true">
                <application path="/">
                    <virtualDirectory path="/" physicalPath="%IIS_SITES_HOME%\Tests" />
                </application>
                <bindings>
                    <binding protocol="http" bindingInformation="*:9999:*" />
                </bindings>
            </site>
```

## PHP web service

Copy folder **HeroesWebservice** to **www** folder under **wamp** server publish folder

## MySQL data

Run this script in MYSQL console or **phpMyADmin**

```
CREATE TABLE IF NOT EXISTS `heroes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;

INSERT INTO `heroes` (`ID`, `Name`) VALUES
(1, 'Rubber Man'),
(2, 'Bombasto'),
(3, 'Mr. Nice'),
(5, 'Celeritas'),
(6, 'Magma'),
(10, 'Blombo'),
(16, 'Dynama'),
(17, 'Mr. Wonder'),
(18, 'Narco'),
(19, 'Super Man'),
(22, 'Bat Man'),
(23, 'Bomber Man');
```

Open command line and run this command:
```sh
iisexpress.exe" /site:WebSite2
```

## Knockout folder

**knockout** folder is included inside visual studio project folder, to start the Knockout application browse to:
```
http://yourhost:port/knockout
```



From **users-app** install packages first:

```
npm install
```

and run the application:

```
ng serve --open
```

Good luck